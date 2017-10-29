// Polyfill for Chrome caching
importScripts('js/cache-polyfill.js');

// Install the ServiceWorker
self.addEventListener('install', function(event) {
  event.waitUntil(

    // Open a cache
    caches.open('v1').then(function(cache) {

      // Define what we want to cache
      return cache.addAll([
        '/',
        'index.html',
        'js/app.js',
        'js/jquery.min.js',
        'js/referee.js',
        'css/style.css',
        'favicon.ico',
        'manifest.json',
        'img/icon_36.png',
        'img/icon_48.png',
        'img/icon_72.png',
        'img/icon_96.png',
        'img/icon_144.png',
        'img/icon_192.png'
      ]);
    })
  );
});

// Use ServiceWorker (or not) to fetch data
self.addEventListener('fetch', function(event) {

  event.respondWith(

    // Look for something in the cache that matches the request
    caches.match(event.request).then(function(response) {

      // If we find something, return it
      // Otherwise, use the network instead
      return response || fetch(event.request);
    })
  );
});