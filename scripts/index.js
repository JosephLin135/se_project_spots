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


initialCards.forEach(function(card){
    console.log(card);
})

