// console.log("Hello");
let initialCards = [
{   name: "Mt. Fuji",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
},
{   name: "Fushimi Inari Taishi",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
},
{   name: "Kyoto",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
},
{   name: "Shibuya Crossing",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
},
{   name: "Tokyo Sky Tree",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
},
{   name: "Tokyo Tower",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
},
];

// Select the necessary form elements. You should select
// these from inside the modal, not the document.
const profileFormElement = document.querySelector("#edit-profile-modal .modal__form");
const nameInput = profileFormElement.querySelector("#profile-name-input");
const jobInput = profileFormElement.querySelector("#profile-description-input");

// If you haven't done so already, select
// the profile elements from the document.
const profileNameElement = document.querySelector(".profile__info-title");
const profileJobElement = document.querySelector(".profile__info-subheading");
// Select the necessary form elements. You should select
// these from inside the modal, not the document.
const addCardFormElement = document.querySelector("#new-post-modal .modal__form");
const cardNameInput = addCardFormElement.querySelector("#post-caption-input");
const cardLinkInput = addCardFormElement.querySelector("#post-image-input");

// This is for the edit profile button
// Modal helper functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const editProfile = document.querySelector(".profile__button_type_edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");

editProfile.addEventListener("click", function () {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
    openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
    closeModal(editProfileModal);
});
// This is for the new post button
const newPost = document.querySelector(".profile__button_type_new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

newPost.addEventListener("click", function () {
   openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
    closeModal(newPostModal);
});


initialCards.forEach(function(card){
    console.log(card.name);
})

// Create the form submission handler. 
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault(); 
 
  // Get the values of each form field from the value
  // property of the corresponding input element.
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Insert these new values into the textContent
  // property of the corresponding profile elements.
  profileNameElement.textContent = nameValue;
  profileJobElement.textContent = jobValue;

  // Close the modal.
  closeModal(editProfileModal);
}


// Create the form submission handler.
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault(); 
 
  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  // Log both input values to the console.
  console.log(cardNameValue);
  console.log(cardLinkValue);

  // Close the modal.
  closeModal(newPostModal);
}

// Create the submit listener.
addCardFormElement.addEventListener('submit', handleAddCardSubmit);

// Set the submit listener.
profileFormElement.addEventListener('submit', handleProfileFormSubmit);



