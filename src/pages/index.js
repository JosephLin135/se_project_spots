import Api from "../utils/Api.js";
import { enableValidation, clearValidation, settings } from "../scripts/validation.js";
import "./index.css";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "237d90ea-1c5a-440c-ac37-382169cb036c",
    "Content-Type": "application/json",
  },
});

let currentUserId = null;
let selectedCard = null;
let selectedCardId = null;

const profileFormElement = document.querySelector("#edit-profile-modal .modal__form");
const nameInput = profileFormElement.querySelector("#profile-name-input");
const jobInput = profileFormElement.querySelector("#profile-description-input");

const profilePictureElement = document.querySelector(".profile__picture");
const profileNameElement = document.querySelector(".profile__info-title");
const profileJobElement = document.querySelector(".profile__info-subheading");

const addCardFormElement = document.querySelector("#new-post-modal .modal__form");
const cardNameInput = addCardFormElement.querySelector("#post-caption-input");
const cardLinkInput = addCardFormElement.querySelector("#post-image-input");
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close-button");
const previewModalContainer = previewModal.querySelector(".modal__container_type_preview");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const editAvatarButton = document.querySelector(".profile__picture-edit-button");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseButton = editAvatarModal.querySelector(".modal__close-button");
const avatarFormElement = document.querySelector("#edit-avatar-modal .modal__form");
const avatarInput = avatarFormElement.querySelector("#avatar-link-input");

const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteCardCloseButton = deleteCardModal.querySelector(".modal__close-button");
const deleteCardCancelButton = deleteCardModal.querySelector(".modal__cancel-button");
const deleteCardFormElement = document.querySelector("#delete-card-modal .modal__form");

const modalList = document.querySelectorAll(".modal");

function handleEscapeKey(event) {
  if (event.key !== "Escape") {
    return;
  }

  const openedModal = document.querySelector(".modal_is-opened");

  if (openedModal) {
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function renderPreviewImage(link, altText) {
  const existingPreviewImage = previewModalContainer.querySelector(".modal__image");

  if (existingPreviewImage) {
    existingPreviewImage.remove();
  }

  const previewImageElement = document.createElement("img");
  previewImageElement.classList.add("modal__image");
  previewImageElement.src = link;
  previewImageElement.alt = altText;

  previewModalContainer.insertBefore(previewImageElement, previewModalCaption);
}

const editProfile = document.querySelector(".profile__button_type_edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");

editProfile.addEventListener("click", function () {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
    clearValidation(profileFormElement, settings);
    openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
    closeModal(editProfileModal);
});

editAvatarButton.addEventListener("click", function () {
  avatarFormElement.reset();
  clearValidation(avatarFormElement, settings);
  openModal(editAvatarModal);
});

editAvatarCloseButton.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

deleteCardCloseButton.addEventListener("click", function () {
  closeModal(deleteCardModal);
});

deleteCardCancelButton.addEventListener("click", function () {
  closeModal(deleteCardModal);
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

modalList.forEach(function (modal) {
  modal.addEventListener("click", handleOverlayClick);
});


function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeIcon = cardElement.querySelector(".card__like-icon");
  const cardName = data.name && data.name.trim() ? data.name.trim() : "User post";

  cardImage.src = data.link;
  cardImage.alt = `${cardName} image`;
  cardTitle.textContent = cardName;

  if (data.owner && data.owner !== currentUserId) {
    deleteButton.style.display = "none";
  }

  if (data.isLiked) {
    likeButton.classList.add("card__like-button_is-active");
    likeIcon.src = "./images/heart.svg";
  }

  cardImage.addEventListener("click", function() {
    renderPreviewImage(data.link, `${cardName} image`);
    previewModalCaption.textContent = cardName;
    openModal(previewModal);
  });

  deleteButton.addEventListener("click", function () {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteCardModal);
  });

  likeButton.addEventListener("click", function () {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");

    if (data._id) {
      const likeMethod = isLiked ? api.unlikeCard(data._id) : api.likeCard(data._id);
      likeMethod
        .then(function () {
          likeButton.classList.toggle("card__like-button_is-active");
          if (likeButton.classList.contains("card__like-button_is-active")) {
            likeIcon.src = "./images/heart.svg";
          } else {
            likeIcon.src = "./images/like.svg";
          }
        })
        .catch(console.error);
    } else {
      likeButton.classList.toggle("card__like-button_is-active");
      if (likeButton.classList.contains("card__like-button_is-active")) {
        likeIcon.src = "./images/heart.svg";
      } else {
        likeIcon.src = "./images/like.svg";
      }
    }
  });

  return cardElement;
}

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(function ([cards, userData]) {
    currentUserId = userData._id;
    profilePictureElement.src = userData.avatar;
    profileNameElement.textContent = userData.name;
    profileJobElement.textContent = userData.about;
    cards.forEach(function (card) {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = profileFormElement.querySelector(settings.submitButtonSelector);
  const originalText = submitButton.textContent;
  submitButton.textContent = "Saving...";

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  api.setUserInfo({ name: nameValue, about: jobValue })
    .then(function (userData) {
      profileNameElement.textContent = userData.name;
      profileJobElement.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(function () {
      submitButton.textContent = originalText;
    });
}


function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardNameValue = cardNameInput.value.trim();
  const cardLinkValue = cardLinkInput.value.trim();

  if (!cardNameValue || !cardLinkValue) {
    addCardFormElement.reportValidity();
    return;
  }

  const submitButton = addCardFormElement.querySelector(settings.submitButtonSelector);
  const originalText = submitButton.textContent;
  submitButton.textContent = "Saving...";

  api.addCard({ name: cardNameValue, link: cardLinkValue })
    .then(function (newCard) {
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);
      addCardFormElement.reset();
      clearValidation(addCardFormElement, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(function () {
      submitButton.textContent = originalText;
    });
}


function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitButton = deleteCardFormElement.querySelector(settings.submitButtonSelector);
  const originalText = submitButton.textContent;

  if (!selectedCardId) {
    selectedCard.remove();
    closeModal(deleteCardModal);
    selectedCard = null;
    selectedCardId = null;
    return;
  }

  submitButton.textContent = "Deleting...";

  api.deleteCard(selectedCardId)
    .then(function () {
      selectedCard.remove();
      closeModal(deleteCardModal);
      selectedCard = null;
      selectedCardId = null;
    })
    .catch(console.error)
    .finally(function () {
      submitButton.textContent = originalText;
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarFormElement.querySelector(settings.submitButtonSelector);
  const originalText = submitButton.textContent;
  submitButton.textContent = "Saving...";

  const avatarLink = avatarInput.value.trim();

  api.updateAvatar({ avatar: avatarLink })
    .then(function (userData) {
      profilePictureElement.src = userData.avatar;
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(function () {
      submitButton.textContent = originalText;
    });
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

deleteCardFormElement.addEventListener("submit", handleDeleteSubmit);

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(settings);