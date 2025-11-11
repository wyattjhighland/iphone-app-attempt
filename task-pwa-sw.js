// This is a minimal Service Worker file needed for PWA compliance.

self.addEventListener('install', (event) => {
  // The 'install' event fires when the Service Worker is installed.
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  // The 'activate' event fires when the Service Worker takes control.
  console.log('Service Worker activating.');
});

// The 'fetch' event listener is necessary for a valid service worker.
// This one just lets network requests pass through normally without caching.
self.addEventListener('fetch', (event) => {
  // Pass through network requests without intervention
});