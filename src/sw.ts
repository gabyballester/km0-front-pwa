/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

interface ManifestEntry {
  url: string;
  revision: string | null;
}
const isDev = import.meta.env.DEV;

// Versión del service worker para forzar actualización
const SW_VERSION = '1.0.1';

const wbManifest = self.__WB_MANIFEST as (string | { url: string; revision?: string | null })[];

// ===== PRECACHE CONFIGURATION =====

const manifestFiltered: ManifestEntry[] = wbManifest
  .filter(entry => {
    const url = typeof entry === 'string' ? entry : entry.url;
    return isDev
      ? url === 'index.html' || // ✅ Cambio clave: Asegurar index.html en dev
          !/@vite|react-refresh|__vite_ping|\.map$|^chunk-|@react-refresh|@id|@fs/.test(url)
      : true;
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

// Fonts caching
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

// Images strategy
const imageStrategy = new CacheFirst({
  cacheName: `${isDev ? 'dev' : 'prod'}-images`,
  ...commonStrategyOptions
});

registerRoute(({ request }) => request.destination === 'image', imageStrategy);

// Static assets
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: `${isDev ? 'dev' : 'prod'}-static-assets`,
    ...commonStrategyOptions // Includes ignoreVary
  })
);

// ===== NAVIGATION HANDLING =====
if (!isDev) {
  const navigationHandler = createHandlerBoundToURL('index.html');
  const navigationRoute = new NavigationRoute(navigationHandler, {
    allowlist: [new RegExp(`^${import.meta.env.BASE_URL || '/'}`)],
    denylist: [
      /^\/api\//,
      // Excluir archivos estáticos específicos
      /\.(?:png|jpg|jpeg|svg|json|xml|webp|js|mjs|css|woff|woff2|ttf|eot)(\?.*)?$/,
      // Excluir assets de Vite
      /^\/assets\//,
      // Excluir archivos del service worker
      /^\/sw\.js$/,
      /^\/registerSW\.js$/,
      // Excluir archivos de manifiesto
      /^\/manifest\.webmanifest$/,
      // Excluir archivos de PWA
      /^\/pwa-.*\.png$/,
      /^\/apple-touch-icon.*\.png$/,
      /^\/maskable-icon.*\.png$/,
      /^\/screenshot.*\.png$/,
      /^\/splash-screen.*\.png$/,
      /^\/favicon\.ico$/,
      // Excluir rutas que empiecen con _
      /^\/_/
    ]
  });
  registerRoute(navigationRoute);
}

// ===== DEVELOPMENT HANDLING =====
if (isDev) {
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.protocol === 'ws:' || url.pathname.startsWith('/@')) {
      event.respondWith(new Response(null, { status: 502 }));
      return;
    }
    // Offline handling
    if (url.pathname.startsWith('/@')) return;

    event.respondWith(
      (async () => {
        try {
          const cache = await caches.open('dev-fallback');
          const networkResponse = await fetch(event.request);

          if (!isDev) {
            if (networkResponse.ok) {
              await cache.put(event.request, networkResponse.clone());
            }
          }

          return networkResponse;
        } catch (error) {
          console.error('error', error);

          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;

          if (event.request.mode === 'navigate') {
            const fallback = await caches.match('/index.html');
            const offlinePage = await caches.match('/offline.html');
            return fallback || offlinePage || new Response('Offline', { status: 503 });
          }
          return new Response('Offline', { status: 503 });
        }
      })()
    );
  });
}

// ===== CACHE MANAGEMENT =====

self.addEventListener('error', event => {
  console.error('SW Error:', {
    error: event.error,
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

self.addEventListener('unhandledrejection', event => {
  console.error('SW Unhandled Rejection:', event.reason);
});

self.addEventListener('install', event => {
  console.warn('[Service Worker] Installing...');
  console.warn({ event });
  console.warn('[Service Worker] Installed!!');
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(name => name.startsWith(isDev ? 'dev-' : 'prod-'))
            .map(name => caches.delete(name))
        )
      )
      .then(() => {
        console.warn(`[Service Worker] Activated version ${SW_VERSION}`);
        // Forzar la actualización de todos los clientes
        return self.clients.claim();
      })
  );
});

cleanupOutdatedCaches();
self.skipWaiting();
clientsClaim();
