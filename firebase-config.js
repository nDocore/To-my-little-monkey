import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCKCVFMMFKFaV0xrh_epKMKY1hFcv_QTFs",
    authDomain: "to-my-little-monkey.firebaseapp.com",
    databaseURL: "https://to-my-little-monkey-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "to-my-little-monkey",
    storageBucket: "to-my-little-monkey.firebasestorage.app",
    messagingSenderId: "32377841759",
    appId: "1:32377841759:web:202ce1c900809fdd9913ea",
    measurementId: "G-8XN06Q6JL0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { analytics, db, logEvent, ref, push, set };
