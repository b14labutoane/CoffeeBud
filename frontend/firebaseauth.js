import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase config
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

// Function to show messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(function () {
        messageDiv.style.opacity = 0;
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 500);
    }, 5000);
}

// Register User
function registerUser(event) {
    event.preventDefault();
    
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    if (!email || !password || !firstName || !lastName) {
        showMessage('Please fill in all fields.', 'signUpMessage');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
            };
            showMessage('Account created successfully!', 'signUpMessage');

            setDoc(doc(db, "users", user.uid), userData)
                .then(() => {
                    console.log("User added to Firestore");
                    window.location.href = 'homepage.html';
                })
                .catch((error) => {
                    console.error("Error writing document:", error);
                    showMessage('Error saving user data.', 'signUpMessage');
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email already in use.', 'signUpMessage');
            } else {
                showMessage('Unable to create user.', 'signUpMessage');
            }
            console.error("Firebase Auth Error:", error.message);
        });
}

// Sign In User
function loginUser(event) {   
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showMessage('Please enter both email and password.', 'signInMessage');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        showMessage('Login successful!', 'signInMessage');
        
        // Save user data to localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Redirect after successful login
        window.location.href = 'editprofile.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
            showMessage('Invalid email or password.', 'signInMessage');
        } else {
            showMessage('Unable to sign in.', 'signInMessage');
        }
        console.error("Firebase Auth Error:", error.message);
    });
}

// Ensure DOM is ready before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const signUp = document.getElementById('submitSignUp');
    if (signUp) {
        signUp.addEventListener('click', registerUser);
    }

    const signIn = document.getElementById('submitSignIn');
    if (signIn) {
        signIn.addEventListener('click', loginUser);
    }
});
