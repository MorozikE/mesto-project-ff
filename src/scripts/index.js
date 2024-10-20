import "../pages/index.css";
import "./card";
import "./modal";

import { openPopUp, closePopUp, closePopupByOverlay } from "./modal";
import { createCard, likeCard, deleteCard } from "./card";
import { initialCards } from "./cards";

const userName = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const addButon = document.querySelector(".profile__add-button");
const editButon = document.querySelector(".profile__edit-button");

const cardList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const popupCloseBtns = document.querySelectorAll(".popup .popup__close");
const newCardPopUp = document.querySelector(".popup_type_new-card");
const editCardPopUp = document.querySelector(".popup_type_edit");
const imagePopUp = document.querySelector(".popup_type_image");

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

popupCloseBtns.forEach((popupCloseBtn) => {
  popupCloseBtn.addEventListener("click", (evt) => {
    closePopUp(evt.target.closest(".popup"));
  });
});

popups.forEach((popUp) => {
  popUp.addEventListener("mousedown", closePopupByOverlay);
});

addButon.addEventListener("click", () => {
  openPopUp(newCardPopUp);
});

editButon.addEventListener("click", () => {
  openPopUp(editCardPopUp);
  const form = document.forms["edit-profile"];
  form.name.value = userName.textContent;
  form.description.value = description.textContent;
});

const openImagePopUp = (evt) => {
  openPopUp(imagePopUp);
  const image = imagePopUp.querySelector(".popup__image");
  const description = imagePopUp.querySelector(".popup__caption");
  const src = evt.target.getAttribute("src");
  const cardDescription =
    evt.target.parentNode.querySelector(".card__title").textContent;
  image.setAttribute("src", src);
  description.textContent = cardDescription;
};

initialCards.forEach((card) => {
  const cardForRender = createCard(card, deleteCard, likeCard, openImagePopUp);
  cardList.append(cardForRender);
});

const editCardFormSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = evt.target.name.value;
  description.textContent = evt.target.description.value;
  closePopUp(evt.target.closest(".popup"));
};

const newCardSubmit = (evt) => {
  evt.preventDefault();
  const newCardForm = document.forms["new-place"];
  const newCard = {
    name: newCardForm["place-name"].value,
    link: newCardForm.link.value,
  };

  const cardForRender = createCard(
    newCard,
    deleteCard,
    likeCard,
    openImagePopUp
  );
  cardList.prepend(cardForRender);
  newCardForm.reset();
  closePopUp(newCardPopUp);
};

newCardPopUp.addEventListener("submit", newCardSubmit);
editCardPopUp.addEventListener("submit", editCardFormSubmit);
