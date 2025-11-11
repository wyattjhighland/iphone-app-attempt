const CACHE_NAME = 'vocab-sync-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    // We don't cache config.js as it's private, but we must cache the Firebase SDKs if they're used.
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
    'https://placehold.co/192x192/1d4ed8/ffffff?text=VS',
    'https://placehold.co/512x512/1d4ed8/ffffff?text=VS'
];

self.addEventListener('install', (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache and cached core files');
                return cache.addAll(urlsToCache).catch(error => {
                    console.error('Failed to cache resources:', error);
                });
            })
    );
});

self.addEventListener('fetch', (event) => {
    // Serve from cache first, then fall back to network
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // No cache hit - fetch from network
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    // Clean up old caches
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});