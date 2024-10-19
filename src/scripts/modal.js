import { userName, description, updateProfile } from "./profile";
import { createCard } from "./cards";
import { cardList } from "./index";

let openedPopUp = undefined;
const editForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

function closePopUp() {
  openedPopUp.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEscClosePopUp);
}
const pressEscClosePopUp = (evt) => {
  if (evt.keyCode === 27) {
    closePopUp();
  }
};

const overlayClickClosePopUp = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopUp();
  }
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const currentName = document.forms["edit-profile"].name.value;
  const currentDescription = document.forms["edit-profile"].description.value;

  updateProfile(currentName, currentDescription);
};

const newCardSubmit = (evt) => {
  evt.preventDefault();
  const newCard = {};
  newCard.name = newCardForm["place-name"].value;
  newCard.link = newCardForm.link.value;

  const cardForRender = createCard(
    newCard,
    deleteCard,
    likeCard,
    openImagePopUp
  );
  cardList.prepend(cardForRender);
  closePopUp();
  newCardForm.reset();
};

const POPUP = {
  newCardPopUp: ".popup_type_new-card",
  editCardPopUp: ".popup_type_edit",
  imagePopUp: ".popup_type_image",
};

function openPopUp(attribute, evt = null) {
  openedPopUp = document.querySelector(attribute);
  const popUpCloseBtn = openedPopUp.querySelector(".popup__close");

  if (attribute === POPUP.editCardPopUp) {
    editForm.name.value = userName.textContent;
    editForm.description.value = description.textContent;
    editForm.addEventListener("submit", handleFormSubmit);
  } else if (attribute === POPUP.newCardPopUp) {
    newCardForm.addEventListener("submit", newCardSubmit);
  } else if (attribute === POPUP.imagePopUp) {
    const image = openedPopUp.querySelector(".popup__image");
    const description = openedPopUp.querySelector(".popup__caption");
    const src = evt.target.getAttribute("src");
    const cardDescription =
      evt.target.parentNode.querySelector(".card__title").textContent;

    image.setAttribute("src", src);
    description.textContent = cardDescription;
  }

  openedPopUp.classList.add("popup_is-opened");
  openedPopUp.addEventListener("mousedown", overlayClickClosePopUp);
  document.addEventListener("keydown", pressEscClosePopUp);
  popUpCloseBtn.addEventListener("click", closePopUp);
}

export { POPUP, openPopUp };
