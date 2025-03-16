import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu2lp1BsnqTdc3FK9gATIMWevtkttGK68",
    authDomain: "coffeebud-d0960.firebaseapp.com",
    projectId: "coffeebud-d0960",
    storageBucket: "coffeebud-d0960.appspot.com",
    messagingSenderId: "1061672167679",
    appId: "1:1061672167679:web:f39ecd079d344f6f0484ca",
    measurementId: "G-G7LZYRSW5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to fetch user data
async function fetchUserData(userId) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('loggedUserFName').innerText = data.firstName;
            document.getElementById('loggedUserLName').innerText = data.lastName;
            document.getElementById('loggedUserEmail').innerText = data.email;
        } else {
            console.log("No document found for this user.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchUserData(user.uid); // Fetch user data from Firestore
    } else {
        console.log("No user is signed in. Redirecting...");
        window.location.href = "homepage.html"; // Redirect to login page
    }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    signOut(auth)
    .then(() => {
        window.location.href='homepage.html';
        console.log("User signed out successfully.");
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});