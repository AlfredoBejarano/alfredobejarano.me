  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
  import { getDatabase  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";

  const firebaseConfig = {
  apiKey: "AIzaSyDxXGSJiXqmAaN0nJqHWMJAwt_WwdbhZIc",
  authDomain: "portfolio-853f7.firebaseapp.com",
  databaseURL: "https://portfolio-853f7-default-rtdb.firebaseio.com",
  projectId: "portfolio-853f7",
  storageBucket: "portfolio-853f7.firebasestorage.app",
  messagingSenderId: "494666949227",
  appId: "1:494666949227:web:8dd0bd8cbff3731422472e",
  measurementId: "G-TZKL382C9B"
};

  const app = initializeApp(firebaseConfig);

  export const database = getDatabase(app);
  export const analytics = getAnalytics(app);