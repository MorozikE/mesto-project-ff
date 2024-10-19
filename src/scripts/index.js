import "../pages/index.css";
import "./cards";
import "./modal";
import "./profile";

import { createCard } from "./cards";
import {initialCards} from "./constant"

const cardList = document.querySelector(".places__list");

const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

const openImagePopUp = (evt) => {
  openPopUp(POPUP.imagePopUp, evt);
};

initialCards.forEach((card) => {
  const cardForRender = createCard(card, deleteCard, likeCard, openImagePopUp);
  cardList.append(cardForRender);
});

export {cardList}