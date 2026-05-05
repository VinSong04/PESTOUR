import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration
// Note: These are safe to be public — Firebase security comes from
// Firebase Security Rules, not from hiding the client config.
const firebaseConfig = {
    apiKey: "AIzaSyD4E1mAaY4HkId_h41YQz_kijN4R_h3In8",
    authDomain: "pestour-965ff.firebaseapp.com",
    databaseURL: "https://pestour-965ff-default-rtdb.firebaseio.com",
    projectId: "pestour-965ff",
    storageBucket: "pestour-965ff.firebasestorage.app",
    messagingSenderId: "518176676119",
    appId: "1:518176676119:web:a21a447983ba8deb297f52"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
