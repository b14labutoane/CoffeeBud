class Card {
  constructor({
    imageUrl,
    onDismiss,
    description,
    onLike,
    onDislike,
    modalTitle,  
    modalDescription, 
    modal 
  }) {
    this.imageUrl = imageUrl;
    this.description = description;
    this.onDismiss = onDismiss;
    this.onLike = onLike;
    this.onDislike = onDislike;
    this.modalTitle = modalTitle;
    this.modalDescription = modalDescription;
    this.modal = modal;
    this.#init()
  }

  // private properties
  #startPoint;
  #offsetX;
  #offsetY;
  #isDraggable = true;

  #isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }

  #init = () => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = this.imageUrl;
    card.append(img);
    const btn = document.createElement('button');
    btn.textContent = 'Get to know them!';
    btn.onclick = () => this.openModal();
    card.appendChild(btn);
    this.element = card;

    if (this.#isTouchDevice()) {
      this.#listenToTouchEvents();
    } else {
      this.#listenToMouseEvents();
    }
  
    this.closeBtn = document.getElementById('closeBtn');
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }
    
    this.#disableSelectOnDoubleClick();

    if (this.modal) {
      this.closeBtn = this.modal.querySelector('.closeBtn');
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => {
          this.closeModal();
        });
     }
    }
  }

  openModal() {
    if (!this.modalTitle || !this.modalDescription || !this.modal) {
      console.error("Modal elements are not defined!");
      return;
    }

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }

    this.modalTitle.innerText = `About`;
    this.modalDescription.innerText = this.description;
    this.modal.style.display = 'flex'; 
    overlay.style.display = 'block'; 
  }

  dismiss() {
    this.element.remove();
    if (typeof this.onDismiss === 'function') {
      this.onDismiss();
    }
    this.enableDragging();
  }

  #listenToTouchEvents = () => {
    this.element.addEventListener('touchstart', (e) => {
      if (!this.#isDraggable) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('touchend', this.#handleTouchEnd);
  }

  #listenToMouseEvents = () => {
    this.element.addEventListener('mousedown', (e) => {
      console.log("Mouse down. isDraggable:", this.#isDraggable);
      if (!this.#isDraggable) return;
      console.log("Mouse down detected!");
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('mousemove', this.#handleMouseMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('mouseup', this.#handleMoveUp);

    this.element.addEventListener('dragstart', (e) => e.preventDefault());
  }

  #handleMove = (x, y) => {
    this.#offsetX = x - this.#startPoint.x;
    this.#offsetY = y - this.#startPoint.y;
    const rotate = this.#offsetX * 0.1;
    this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
    // dismiss card
    if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    }
  }

  // mouse event handlers
  #handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#handleMove(clientX, clientY);
  }

  #handleMoveUp = () => {
    if (!this.#startPoint) return;
    this.#startPoint = null;
    document.removeEventListener('mousemove', this.#handleMouseMove);
    document.removeEventListener('mouseup', this.#handleMoveUp);
    this.element.style.transition = 'transform 0.3s ease-out';
    this.element.style.transform = 'translate(0px, 0px)';
  }

  // touch event handlers
  #handleTouchMove = (e) => {
    if (!this.#startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.#handleMove(clientX, clientY);
  }

  #handleTouchEnd = () => {
    this.#startPoint = null;
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transform = '';
  }

  #dismiss = (direction) => {
    this.#startPoint = null;
    document.removeEventListener('mouseup', this.#handleMoveUp);
    document.removeEventListener('mousemove', this.#handleMouseMove);
    document.removeEventListener('touchend', this.#handleTouchEnd);
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transition = 'transform 1s';
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add('dismissing');
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    if (typeof this.onDismiss === 'function') {
      this.onDismiss();
    }
    if (typeof this.onLike === 'function' && direction === 1) {
      this.onLike();
    }
    if (typeof this.onDislike === 'function' && direction === -1) {
      this.onDislike();
    }
  }

  #disableSelectOnDoubleClick = () => {
    let lastClickTime = 0;

      this.element.addEventListener('dblclick', (e) => {
      e.preventDefault(); 

      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime < 400) 
        return; // pt spam
      lastClickTime = currentTime;

      this.#isDraggable = false;
  
      if (window.getSelection) {
        window.getSelection().removeAllRanges(); 
      } else if (document.selection) {
        document.selection.empty(); 
      }
      
      this.element.style.transition = 'transform 0.3s ease-out'; 
      this.element.style.transform = 'translate(0px, 0px) rotate(0deg)';

      const img = this.element.querySelector('img');
        if (img) {
            img.draggable = false;
            img.style.userSelect = 'none';     
            img.style.pointerEvents = 'none';  
            img.style.webkitUserDrag = 'none';   
      }

      this.element.style.userSelect = 'none';
      this.element.blur();
    
      console.log("Dragging and selection disabled");
    });
  };

  enableDragging() {
    this.#isDraggable = true;

  const img = this.element.querySelector('img');
  if (img) {
    img.draggable = true;
    img.style.userSelect = '';
    img.style.pointerEvents = '';
    img.style.webkitUserDrag = '';
  }

  this.element.style.userSelect = '';
  this.element.style.pointerEvents = '';

  console.log("Dragging re-enabled");
  };

  closeModal() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
    this.enableDragging();
  };
}