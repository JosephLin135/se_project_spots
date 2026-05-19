let initialCards = [
{   name: "Mt. Fuji",
  link: "./images/fuji.jpg"
},
{   name: "Fushimi Inari Taisha",
  link: "./images/fushimi.jpg"
},
{   name: "Kyoto",
  link: "./images/kyoto.jpg"
},
{   name: "Shibuya Crossing",
  link: "./images/shibuya.jpg"
},
{   name: "Tokyo Sky Tree",
  link: "./images/sky-tree.jpg"
},
{   name: "Tokyo Tower",
  link: "./images/tokyo-tower.jpg"
},
];

const profileFormElement = document.querySelector("#edit-profile-modal .modal__form");
const nameInput = profileFormElement.querySelector("#profile-name-input");
const jobInput = profileFormElement.querySelector("#profile-description-input");

const profileNameElement = document.querySelector(".profile__info-title");
const profileJobElement = document.querySelector(".profile__info-subheading");

const addCardFormElement = document.querySelector("#new-post-modal .modal__form");
const cardNameInput = addCardFormElement.querySelector("#post-caption-input");
const cardLinkInput = addCardFormElement.querySelector("#post-image-input");
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close-button");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");


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

const newPost = document.querySelector(".profile__button_type_new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

newPost.addEventListener("click", function () {
   openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
    closeModal(newPostModal);
});

previewModalCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});


function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", function() {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  deleteButton.addEventListener("click", function() {
    cardElement.remove();
  });

  const likeIcon = cardElement.querySelector(".card__like-icon");
  likeButton.addEventListener("click", function() {
    likeButton.classList.toggle("card__like-button_is-active");
    if (likeButton.classList.contains("card__like-button_is-active")) {
      likeIcon.src = "./images/liked.svg";
    } else {
      likeIcon.src = "./images/like.svg";
    }
  });

  return cardElement;
}

initialCards.forEach(function(card) {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

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
  
  evt.preventDefault(); 
 
  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  const newCardData = {
    name: cardNameValue,
    link: cardLinkValue
  };

  const cardElement = getCardElement(newCardData);
  cardsList.prepend(cardElement);

  cardNameInput.value = "";
  cardLinkInput.value = "";
  
  // Close the modal.
  closeModal(newPostModal);
}


addCardFormElement.addEventListener('submit', handleAddCardSubmit);


profileFormElement.addEventListener('submit', handleProfileFormSubmit);