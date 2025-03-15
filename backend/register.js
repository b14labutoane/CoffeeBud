<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAu2lp1BsnqTdc3FK9gATIMWevtkttGK68",
    authDomain: "coffeebud-d0960.firebaseapp.com",
    projectId: "coffeebud-d0960",
    storageBucket: "coffeebud-d0960.firebasestorage.app",
    messagingSenderId: "1061672167679",
    appId: "1:1061672167679:web:f39ecd079d344f6f0484ca",
    measurementId: "G-G7LZYRSW5G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>