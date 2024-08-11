self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('naivas-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/customer.html',
        '/styles.css',
        '/customer.js',
        '/icons/icon-512x512.png',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
