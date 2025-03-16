import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAu2lp1BsnqTdc3FK9gATIMWevtkttGK68",
    authDomain: "coffeebud-d0960.firebaseapp.com",
    projectId: "coffeebud-d0960",
    storageBucket: "coffeebud-d0960.firebasestorage.app",
    messagingSenderId: "1061672167679",
    appId: "1:1061672167679:web:f39ecd079d344f6f0484ca",
    measurementId: "G-G7LZYRSW5G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

const modal = document.querySelector("#modal");
const modalTitle = modal.querySelector("#modal-title");
const modalDescription = modal.querySelector("#modal-description");
const overlay = document.querySelector("#overlay");
const closeModalButtons = modal.querySelectorAll(".close-btn");

let cardCount = 0;
let usersData = [];

async function fetchUsersData() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        usersData = querySnapshot.docs.map(doc => doc.data());
        populateCards();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function populateCards() {
    if (usersData.length === 0) {
        const message = document.createElement('h2');
        message.innerText = "No users found!";
        message.style.color = "black";
        message.style.marginTop = "20px";
        message.style.fontFamily = 'Delius';
        swiper.appendChild(message);
        return;
    }
    appendNewCard();
}

function appendNewCard() {
    if (cardCount >= usersData.length) {
        const message = document.createElement('h2');
        message.innerText = "Mergi la plimbare!";
        message.style.color = "black";
        message.style.marginTop = "20px";
        message.style.fontFamily = 'Delius';
        swiper.appendChild(message);
        return;
    }

    const userData = usersData[cardCount];
    const card = new Card({
        imageUrl: userData.profilePicURL,
        description: `Name: ${userData.firstName} ${userData.lastName}, Bio: ${userData.bio}`,
        onDismiss: appendNewCard,
        onLike: () => {
            like.style.animationPlayState = 'running';
            like.classList.toggle('trigger');
        },
        onDislike: () => {
            dislike.style.animationPlayState = 'running';
            dislike.classList.toggle('trigger');
        }
    });

    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--cardCount', index);
    });
}

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

overlay.addEventListener('click', closeModal);
closeModalButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

fetchUsersData();