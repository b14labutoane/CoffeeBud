const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

//constante 
const urls = [ //volatil
  "/frontend/assets/pers1.jpg",
  "/frontend/assets/pers2.jpg",
  "/frontend/assets/pers3.jpg",
  "/frontend/assets/pers4.jpg",
  "/frontend/assets/pers5.jpg"
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
        message.style.fontFamily = "Lucida Console, monospace";

        swiper.appendChild(message);
      return;
    }
  
    const card = new Card({  
      imageUrl: urls[cardCount], 
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

appendNewCard();


