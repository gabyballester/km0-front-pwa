/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

import { ENV_CONFIG } from '@constants';

declare const self: ServiceWorkerGlobalScope;

interface ManifestEntry {
  url: string;
  revision: string | null;
}

const isDev = ENV_CONFIG.IS_DEV;

// Versión dinámica del service worker basada en timestamp
const SW_VERSION = isDev ? `dev-${Date.now()}` : `prod-${Date.now()}`;

// Solo mostrar logs detallados en desarrollo
const log = (message: string, level: 'info' | 'warn' | 'error' = 'info') => {
  if (isDev || level === 'error') {
    const prefix = '[Service Worker]';
    switch (level) {
      case 'warn':
        console.warn(`${prefix} ${message}`);
        break;
      case 'error':
        console.error(`${prefix} ${message}`);
        break;
      default:
        console.warn(`${prefix} ${message}`);
    }
  }
};

log(`Initializing... ${SW_VERSION}`);

const wbManifest = self.__WB_MANIFEST as (string | { url: string; revision?: string | null })[];

// ===== PRECACHE CONFIGURATION =====

const manifestFiltered: ManifestEntry[] = wbManifest
  .filter(entry => {
    const url = typeof entry === 'string' ? entry : entry.url;
    // Filtros más estrictos para evitar problemas de MIME type
    const shouldExclude = isDev
      ? /@vite|react-refresh|__vite_ping|\.map$|^chunk-|@react-refresh|@id|@fs|hot-update/.test(url)
      : /@vite|react-refresh|\.map$|^chunk-/.test(url);

    // Solo incluir archivos que sabemos que existen y tienen el MIME type correcto
    const isValidFile =
      /\.(js|css|html|ico|png|svg|webp|woff2|json)$/.test(url) || url === 'index.html';

    return !shouldExclude && isValidFile;
  })
  .map((entry): ManifestEntry => {
    if (typeof entry === 'string') {
      return { url: entry, revision: null };
    }
    return {
      url: entry.url,
      revision:
        entry.revision || (entry.url === 'index.html' && isDev ? Date.now().toString() : null)
    };
  });

// Cleanup y precache
cleanupOutdatedCaches();
precacheAndRoute(manifestFiltered);

const commonStrategyOptions = {
  matchOptions: { ignoreVary: true },
  plugins: [
    new ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: isDev ? 3600 : 30 * 24 * 3600,
      purgeOnQuotaError: true
    })
  ]
};

// ===== RUNTIME CACHING =====

// Google Fonts caching
registerRoute(
  ({ url }) => url.hostname === 'fonts.gstatic.com',
  new CacheFirst({
    cacheName: `${isDev ? 'dev' : 'prod'}-google-fonts`,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
      })
    ],
    matchOptions: { ignoreVary: true }
  })
);

// Google Fonts stylesheets
registerRoute(
  ({ url }) => url.href.startsWith('https://fonts.googleapis.com/'),
  new StaleWhileRevalidate({
    cacheName: `${isDev ? 'dev' : 'prod'}-google-fonts-stylesheets`,
    ...commonStrategyOptions
  })
);

// Images strategy - Cache First para imágenes estáticas
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: `${isDev ? 'dev' : 'prod'}-images`,
    ...commonStrategyOptions
  })
);

// Static assets - Stale While Revalidate para permitir actualizaciones
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: `${isDev ? 'dev' : 'prod'}-static-assets`,
    ...commonStrategyOptions
  })
);

// API calls - Network First para datos dinámicos
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: `${isDev ? 'dev' : 'prod'}-api-cache`,
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60 // 5 minutos
      })
    ]
  })
);

// ===== NAVIGATION HANDLING =====
// Solo en producción para evitar conflictos con Vite dev server
if (!isDev) {
  try {
    const navigationHandler = createHandlerBoundToURL('/index.html');
    const navigationRoute = new NavigationRoute(navigationHandler, {
      allowlist: [new RegExp(`^${ENV_CONFIG.BASE_URL}`)],
      denylist: [
        /^\/api\//,
        // Archivos estáticos específicos
        /\.(?:png|jpg|jpeg|svg|json|xml|webp|js|mjs|css|woff|woff2|ttf|eot)(\?.*)?$/,
        // Assets de Vite
        /^\/assets\//,
        // Service worker files
        /^\/sw\.js$/,
        /^\/workbox-.*\.js$/,
        /^\/registerSW\.js$/,
        // Manifest files
        /^\/manifest\.webmanifest$/,
        // PWA files
        /^\/pwa-.*\.png$/,
        /^\/apple-touch-icon.*\.png$/,
        /^\/maskable-icon.*\.png$/,
        /^\/screenshot.*\.png$/,
        /^\/favicon\.ico$/,
        // Routes starting with _
        /^\/_/,
        // Vite specific
        /^\/@/
      ]
    });
    registerRoute(navigationRoute);
  } catch (error) {
    log(`Error setting up navigation route: ${error}`, 'error');
  }
}

// ===== EVENT LISTENERS =====

// Función para limpiar cachés antiguos
const cleanupOldCaches = async () => {
  const cacheNames = await self.caches.keys();
  const oldCaches = cacheNames.filter(
    cacheName => cacheName.includes('precache') && !cacheName.includes(SW_VERSION)
  );

  await Promise.all(
    oldCaches.map(cacheName => {
      log(`Deleting old cache: ${cacheName}`, 'warn');
      return self.caches.delete(cacheName);
    })
  );
};

// Función para notificar a los clientes
const notifyClients = async () => {
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'SW_ACTIVATED',
      version: SW_VERSION
    });
  });
};

self.addEventListener('install', () => {
  log(`Installed!! SW Version: ${SW_VERSION}`, 'warn');
  // Forzar la activación inmediata
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  log(`Activated version ${SW_VERSION}`, 'warn');
  event.waitUntil(Promise.resolve(clientsClaim()).then(cleanupOldCaches).then(notifyClients));
});

// Manejar errores de carga de módulos
self.addEventListener('error', event => {
  log(`Error: ${event.message}`, 'error');

  // Si es un error de MIME type o archivo no encontrado, intentar recargar la página
  if (
    event.message &&
    (event.message.includes('MIME type') ||
      event.message.includes('Failed to load') ||
      event.message.includes('404'))
  ) {
    log('Resource loading error detected, attempting recovery...', 'warn');
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_RESOURCE_ERROR',
          error: event.message
        });
      });
    });
  }
});

self.addEventListener('unhandledrejection', event => {
  log(`Unhandled Promise Rejection: ${event.reason}`, 'error');

  // Si es un error de MIME type o archivo no encontrado, intentar recargar la página
  if (
    event.reason &&
    typeof event.reason === 'string' &&
    (event.reason.includes('MIME type') ||
      event.reason.includes('Failed to load') ||
      event.reason.includes('404'))
  ) {
    log('Resource loading rejection detected, attempting recovery...', 'warn');
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_RESOURCE_ERROR',
          error: event.reason
        });
      });
    });
  }
});

// Detectar cuando hay una nueva versión disponible
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    log('Skip waiting requested', 'info');
    self.skipWaiting();
  }

  // Manejar solicitud de limpieza de caché
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    self.caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            log(`Clearing cache: ${cacheName}`, 'warn');
            return self.caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        event.ports[0]?.postMessage({ success: true });
      });
  }

  // Manejar verificación manual de actualizaciones
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    log('Manual update check requested', 'info');

    // Forzar verificación de actualizaciones
    self.registration
      ?.update()
      .then(() => {
        log('Manual update check completed', 'info');
        // Notificar al cliente
        event.ports[0]?.postMessage({
          success: true,
          message: 'Update check completed'
        });
      })
      .catch(error => {
        log(`Manual update check failed: ${error}`, 'error');
        event.ports[0]?.postMessage({
          success: false,
          error: error.message
        });
      });
  }
});

// Detectar cuando el service worker se actualiza
self.addEventListener('updatefound', () => {
  log('Service worker update found!', 'warn');

  // Notificar a todos los clientes que hay una actualización disponible
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'SW_UPDATE_AVAILABLE',
        version: SW_VERSION
      });
    });
  });
});

// Detectar cuando el controlador cambia (nueva versión activada)
self.addEventListener('controllerchange', () => {
  log('Service worker controller changed!', 'warn');

  // Notificar a todos los clientes que se ha activado una nueva versión
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'SW_CONTROLLER_CHANGED',
        version: SW_VERSION
      });
    });
  });
});
