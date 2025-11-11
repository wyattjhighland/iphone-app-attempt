const CACHE_NAME = 'vocab-pwa-cache-v1';

// List of assets (the App Shell) to cache on installation.
// This includes the HTML, CSS, and all necessary Firebase SDKs and CDNs.
const CACHE_ASSETS = [
    '/', // The main HTML file
    'index.html',
    'manifest.json',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
    // Firebase SDKs (using the exact versions linked in index.html)
    "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js",
    "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js",
    "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"
    // Placeholder icons are also required for a complete PWA setup, but we omit them for simplicity in this single file environment.
];

// --- Install Event: Cache the App Shell ---
self.addEventListener('install', (event) => {
    // This phase occurs when the service worker is first registered.
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching App Shell assets:', CACHE_ASSETS.length);
                return cache.addAll(CACHE_ASSETS);
            })
            .catch(error => {
                console.error('[ServiceWorker] Failed to cache assets:', error);
            })
    );
    self.skipWaiting(); // Forces the waiting service worker to become the active service worker
});


// --- Activate Event: Cleanup Old Caches ---
self.addEventListener('activate', (event) => {
    // This phase removes any previous, unused caches to free up storage.
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // Ensures the active service worker takes control immediately
});


// --- Fetch Event: Serve from Cache, Fallback to Network ---
self.addEventListener('fetch', (event) => {
    // We only want to handle caching for our static App Shell assets.
    // Firebase data interactions will always need a network connection (or rely on the Firebase SDK's internal persistence).
    const url = new URL(event.request.url);

    // 1. Check if the request is for one of the cached assets (App Shell)
    const isAppShellAsset = CACHE_ASSETS.includes(url.pathname) || CACHE_ASSETS.includes(url.href);

    if (isAppShellAsset) {
        // Cache-First Strategy for App Shell (HTML, CSS, JS libraries)
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    // Return the cached asset if found, otherwise fetch from the network
                    return response || fetch(event.request);
                })
        );
    } 
    // 2. Default behavior for all other requests (like Firebase API calls): Network-Only
    // We let these requests go to the network, as data must be real-time.
});