const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

const modal = document.querySelector("#modal");
const modalTitle = modal.querySelector("#modal-title");
const modalDescription = modal.querySelector("#modal-description");
const overlay = document.querySelector("#overlay");
const closeModalButtons = modal.querySelectorAll(".close-btn");

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

//functii
function appendNewCard() {
    if (cardCount >= urls.length) { 
        const message = document.createElement('h2');
        message.innerText = "Mergi la plimbare!";
        message.style.color = "black";
        message.style.marginTop = "20px";
        message.style.fontFamily = 'Delius';

        swiper.appendChild(message);
      return;
    }
  
    const card = new Card({  
      imageUrl: urls[cardCount], 
      description: descriptions[cardCount],
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

appendNewCard();

