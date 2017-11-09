// Polyfill for Chrome caching
importScripts('js/cache-polyfill.js');


var version = '0.501711092229';
var cacheName = 'cache_' + version;
var dataCacheName = 'cache_data_' + version;

var filesToCache = [
  '/',
  'index.html',
  'js/app.js',
  'js/jquery.min.js',
  'js/smtp.js',
  'js/referee.js',
  'css/style.css',
  'icon.png',
  'manifest.json',
  'img/icon_36.png',
  'img/icon_48.png',
  'img/icon_72.png',
  'img/icon_96.png',
  'img/icon_144.png',
  'img/icon_192.png'
];



// Install the ServiceWorker
self.addEventListener('install', function(event) {
  event.waitUntil(

    // Open a cache
    caches.open(cacheName).then(function(cache) {

      // Define what we want to cache
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
      caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
              if (key !== cacheName) {
                  console.log('[ServiceWorker] Removing old cache', key);
                  return caches.delete(key);
              }
          }));
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