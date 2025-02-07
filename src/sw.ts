import { BackgroundSyncPlugin } from "workbox-background-sync";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, Route, registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();

registerRoute(
  ({ request }) => request.destination === "image",
  new StaleWhileRevalidate()
);

// cache images
const imageRoute = new Route(
  ({ request, sameOrigin }) => {
    return sameOrigin && request.destination === "image";
  },
  new CacheFirst({
    cacheName: "images",
  })
);
registerRoute(imageRoute);

// cache api calls
const fetchTasksRoute = new Route(
  ({ request }) => {
    return request.url === import.meta.env.VITE_API_BASE_URL + "/tasks";
  },
  new NetworkFirst({
    cacheName: "api/fetch-tasks",
  })
);
registerRoute(fetchTasksRoute);

// cache navigations
const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigation",
    networkTimeoutSeconds: 3,
  })
);
registerRoute(navigationRoute);

//  background sync
const bgSyncPlugin = new BackgroundSyncPlugin("backgroundSyncQueue", {
  maxRetentionTime: 24 * 60,
});

const taskSubmitRoute = new Route(
  ({ request }) => {
    return request.url.includes(
      import.meta.env.VITE_API_BASE_URL + "/task/create"
    );
  },
  // new NetworkOnly({
  new NetworkFirst({
    cacheName: "api/submit-task",
    plugins: [bgSyncPlugin],
  }),
  "POST"
);
registerRoute(taskSubmitRoute);

const editTaskRoute = new Route(
  ({ request }) => {
    return request.url.includes(
      import.meta.env.VITE_API_BASE_URL + "/task/edit"
    );
  },
  new NetworkFirst({
    // new NetworkOnly({
    cacheName: "api/edit-task",
    plugins: [bgSyncPlugin],
  }),
  "PATCH"
);
registerRoute(editTaskRoute);

const deleteTaskRoute = new Route(
  ({ request }) => {
    return request.url.includes(
      import.meta.env.VITE_API_BASE_URL + "/task/delete"
    );
  },
  new NetworkFirst({
    cacheName: "api/delete-task",
    plugins: [bgSyncPlugin],
  }),
  "DELETE"
);

registerRoute(deleteTaskRoute);
