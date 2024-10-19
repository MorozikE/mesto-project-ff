import "../pages/index.css";
import "./card";
import "./modal";

import { openPopUp, closePopUp } from "./modal";
import { createCard, likeCard, deleteCard } from "./card";
import { initialCards } from "./cards";

const userName = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const addButon = document.querySelector(".profile__add-button");
const editButon = document.querySelector(".profile__edit-button");

const cardList = document.querySelector(".places__list");

const newCardPopUp = document.querySelector(".popup_type_new-card");
const editCardPopUp = document.querySelector(".popup_type_edit");
const imagePopUp = document.querySelector(".popup_type_image");

const openImagePopUp = (evt) => {
  openPopUp(imagePopUp, (popUp) => {
    const image = popUp.querySelector(".popup__image");
    const description = popUp.querySelector(".popup__caption");
    const src = evt.target.getAttribute("src");
    const cardDescription =
      evt.target.parentNode.querySelector(".card__title").textContent;
    image.setAttribute("src", src);
    description.textContent = cardDescription;
  });
};

initialCards.forEach((card) => {
  const cardForRender = createCard(card, deleteCard, likeCard, openImagePopUp);
  cardList.append(cardForRender);
});

const newCardSubmit = (evt) => {
  evt.preventDefault();
  const newCardForm = document.forms["new-place"];
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
  newCardForm.reset();
  closePopUp(evt.target.closest(".popup"));
};

addButon.addEventListener("click", () => {
  openPopUp(newCardPopUp, (popUp) => {
    popUp.addEventListener("submit", newCardSubmit);
  });
});

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = evt.target.name.value;
  description.textContent = evt.target.description.value;
  closePopUp(evt.target.closest(".popup"));
};

editButon.addEventListener("click", () => {
  openPopUp(editCardPopUp, () => {
    const form = document.forms["edit-profile"];
    form.name.value = userName.textContent;
    form.description.value = description.textContent;
    form.addEventListener("submit", handleFormSubmit);
  });
});
