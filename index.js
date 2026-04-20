// console.log("Hello");

// This is for the edit profile button
const editProfile = document.querySelector(".profile__button_type_edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");

editProfile.addEventListener("click", function () {
    editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseButton.addEventListener("click", function () {
    editProfileModal.classList.remove("modal_is-opened");
});
// This is for the new post button
const newPost = document.querySelector(".profile__button_type_new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

newPost.addEventListener("click", function () {
   newPostModal.classList.add("modal_is-opened");
});

newPostCloseButton.addEventListener("click", function () {
    newPostModal.classList.remove("modal_is-opened");
});



