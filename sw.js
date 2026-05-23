// PES TOUR Service Worker — stale-while-revalidate strategy
const CACHE_NAME = 'pestour-v1';

// App shell files to pre-cache on install
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/og-banner.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Install: pre-cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  // Activate immediately without waiting for old SW to finish
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  // Take control of all open clients immediately
  self.clients.claim();
});

// Fetch: stale-while-revalidate for all requests
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests (Firebase, fonts, etc.)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cached) => {
        // Fetch from network (stale-while-revalidate)
        const fetchPromise = fetch(event.request)
          .then((response) => {
            // Cache valid responses
            if (response && response.status === 200 && response.type === 'basic') {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // If network fails and we have a cached HTML page, serve index.html
            if (event.request.destination === 'document') {
              return cache.match('/index.html');
            }
          });

        // Return cached version immediately, update in background
        return cached || fetchPromise;
      });
    })
  );
});
