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
  _deleteCard,
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

const configObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

getUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then((json) => {
    userName.textContent = json.name;
    description.textContent = json.about;
    avatar.style = `background-image: url(${json.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });

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

getCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then((cards) => {
    cards.forEach((card) => {
      const cardForRender = createCard(
        card,
        deleteCard,
        likeCard,
        openImagePopUp
      );
      cardList.append(cardForRender);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const editCardFormSubmit = (evt) => {
  evt.preventDefault();
  updateProfile(evt.target.name.value, evt.target.description.value).catch(
    (err) => {
      console.log(err);
    }
  );
  closePopUp(evt.target.closest(".popup"));
};

const newCardSubmit = (evt) => {
  evt.preventDefault();
  const newCardForm = document.forms["new-place"];
  let cardForRender;

  addNewCard(newCardForm["place-name"].value, newCardForm.link.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((card) => {
      cardForRender = createCard(card, deleteCard, likeCard, openImagePopUp);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardList.prepend(cardForRender);
      newCardForm.reset();
      closePopUp(newCardPopUp);
    });
};

newCardPopUp.addEventListener("submit", newCardSubmit);
editCardPopUp.addEventListener("submit", editCardFormSubmit);

enableValidation(configObject);
