import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

const modal = document.querySelector("#modal");
const modalTitle = modal.querySelector("#modal-title");
const modalDescription = modal.querySelector("#modal-description");
const overlay = document.querySelector("#overlay");
const closeModalButtons = modal.querySelectorAll(".close-btn");

const firebaseConfig = {
    apiKey: "AIzaSyAu2lp1BsnqTdc3FK9gATIMWevtkttGK68",
    authDomain: "coffeebud-d0960.firebaseapp.com",
    projectId: "coffeebud-d0960",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com/",
    storageBucket: "coffeebud-d0960.firebasestorage.app",
    messagingSenderId: "1061672167679",
    appId: "1:1061672167679:web:f39ecd079d344f6f0484ca",
    measurementId: "G-G7LZYRSW5G"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//constante 
const urls = [ //volatil
  "/frontend/assets/pers1.jpg",
  "/frontend/assets/pers2.jpg",
  "/frontend/assets/pers3.jpg",
  "/frontend/assets/pers4.jpg",
  "/frontend/assets/pers5.jpg"
];

const descriptions = [
    "Description for Image 1",
    "Description for Image 2",
    "Description for Image 3",
    "Description for Image 4",
    "Description for Image 5"
  ];

//variabile
let cardCount = 0;
let cardsData = [];

async function fetchCardsData() {
    try {
      const dbRef = ref(db, 'cards');  // 'cards' is the Firebase database node
      const snapshot = await get(dbRef);
  
      if (snapshot.exists()) {
        cardsData = Object.values(snapshot.val());
        appendNewCard(); // Start displaying cards after fetching
      } else {
        console.error("No data found in Firebase");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

//functii
function appendNewCard() {
    if (cardCount >= cardsData.length) { 
        const message = document.createElement('h2');
        message.innerText = "Mergi la plimbare!";
        message.style.color = "black";
        message.style.marginTop = "20px";
        message.style.fontFamily = 'Delius';

        swiper.appendChild(message);
      return;
    }

    const cardData = cardsData[cardCount];

    const card = new Card({  
      imageUrl: cardData.imageUrl,
      description: cardData.description,
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

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

// Event listeners for the close buttons and overlay click
overlay.addEventListener('click', closeModal);
closeModalButtons.forEach(button => {
  button.addEventListener('click', closeModal);
});

//appendNewCard();
fetchCardsData();


