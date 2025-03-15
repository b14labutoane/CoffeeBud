const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

  const imageUrls = [
    'https://via.placeholder.com/200x150.png?text=Image+1',
    'https://via.placeholder.com/200x150.png?text=Image+2',
    'https://via.placeholder.com/200x150.png?text=Image+3'
  ];

  const imageTexts = [
    'This is the first image description.',
    'This is the second image description.',
    'This is the third image description.'
  ];

  // Get the image container where we will add the images and buttons
  const imageContainer = document.getElementById('imageContainer');

  // Function to create images with buttons
  function createImageWithButton(url, text, index) {
    // Create image element
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Image ' + (index + 1);
    img.classList.add('image');

    // Create button element
    const btn = document.createElement('button');
    btn.textContent = 'View Info';

    // Add event listener to the button to open the modal
    btn.addEventListener('click', function () {
      openModal(text);
    });

    // Add the image and button to the container
    const div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(btn);

    imageContainer.appendChild(div);
  }

  // Function to open the modal and show the image text
  function openModal(text) {
    const modal = document.getElementById('myModal');
    const modalText = document.getElementById('modalText');
    modalText.textContent = text; // Set the modal text content
    modal.style.display = 'flex';  // Show the modal
  }

  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';  // Hide the modal
  }

  // Add images and buttons dynamically
  imageUrls.forEach((url, index) => {
    createImageWithButton(url, imageTexts[index], index);
  });