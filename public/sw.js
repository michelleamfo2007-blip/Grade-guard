self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.map(name => caches.delete(name)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Bypass cache completely
  e.respondWith(fetch(e.request));
});
