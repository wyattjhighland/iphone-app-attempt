// IMPORTANT: Replace the placeholders below with your actual Firebase project configuration.
// Get this information from your Firebase project settings in the console.

export const firebaseConfig = {
  apiKey: "AIzaSyDab6vOrYSBgRPRDz5mWwSFHdRXZc8NMhk",
  authDomain: "iphone-97a7b.firebaseapp.com",
  projectId: "iphone-97a7b",
  storageBucket: "iphone-97a7b.firebasestorage.app",
  messagingSenderId: "520962893681",
  appId: "1:520962893681:web:885ce6875c8d40908c78d0"
};

// We need a unique ID for the collection path (e.g., /artifacts/{appId}/public/data/...)
// We will use the projectId from your config for this purpose on GitHub Pages.
export const APP_ID = firebaseConfig.projectId;

// For GitHub deployment, we don't use a custom token, we rely on signInAnonymously().
export const INITIAL_AUTH_TOKEN = null;