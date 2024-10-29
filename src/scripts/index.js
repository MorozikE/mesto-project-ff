import "../pages/index.css";
import "./card";
import "./modal";

import { openPopUp, closePopUp, closePopupByOverlay } from "./modal";
import { createCard, likeCard, deleteCard } from "./card";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserInfo,
  getCards,
  updateProfile,
  addNewCard,
  updateAvatar,
} from "./api";

const userName = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const addButon = document.querySelector(".profile__add-button");
const editButon = document.querySelector(".profile__edit-button");

const cardList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const popupCloseBtns = document.querySelectorAll(".popup .popup__close");
const newCardPopUp = document.querySelector(".popup_type_new-card");
const editCardPopUp = document.querySelector(".popup_type_edit");
const imagePopUp = document.querySelector(".popup_type_image");
const updateAvatarPopUp = document.querySelector(".popup_type_update_avatar");

const configObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId;
Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    userName.textContent = userInfo.name;
    description.textContent = userInfo.about;
    avatar.style = `background-image: url(${userInfo.avatar})`;

    cards.forEach((card) => {
      const cardForRender = createCard(
        userId,
        card,
        deleteCard,
        likeCard,
        openImagePopUp
      );
      cardList.append(cardForRender);
    });
  })
  .catch((err) => console.log(err));

avatar.addEventListener("click", () => openPopUp(updateAvatarPopUp));

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
  const form = document.forms["new-place"];
  clearValidation(form, configObject);
});

editButon.addEventListener("click", () => {
  openPopUp(editCardPopUp);
  const form = document.forms["edit-profile"];
  form.name.value = userName.textContent;
  form.description.value = description.textContent;
  clearValidation(form, configObject);
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

const editCardFormSubmit = (evt) => {
  evt.preventDefault();
  evt.target.button.textContent = "Сохранение...";

  updateProfile(evt.target.name.value, evt.target.description.value)
    .then((json) => {
      userName.textContent = json.name;
      description.textContent = json.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.target.reset();
      closePopUp(evt.target.closest(".popup"));
      evt.target.button.textContent = "Сохранение";
    });
};

const newCardSubmit = (evt) => {
  evt.preventDefault();
  const newCardForm = document.forms["new-place"];
  newCardForm.button.textContent = "Сохранение...";

  addNewCard(newCardForm["place-name"].value, newCardForm.link.value)
    .then((card) => {
      let cardForRender = createCard(userId, card, deleteCard, likeCard, openImagePopUp);
      cardList.prepend(cardForRender);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardForm.reset();
      closePopUp(newCardPopUp);
      newCardForm.button.textContent = "Сохранение";
    });
};

const updateAvatarSubmit = (evt) => {
  evt.preventDefault();
  const input = evt.target.querySelector("#update-avatar__input");
  evt.target.button.textContent = "Сохранение...";

  updateAvatar(input.value)
    .then((json) => {
      avatar.style = `background-image: url(${json.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.target.reset();
      closePopUp(updateAvatarPopUp);
      evt.target.button.textContent = "Сохранение";
    });
};

newCardPopUp.addEventListener("submit", newCardSubmit);
editCardPopUp.addEventListener("submit", editCardFormSubmit);
updateAvatarPopUp.addEventListener("submit", updateAvatarSubmit);

enableValidation(configObject);
