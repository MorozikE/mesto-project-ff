import { openPopUp, POPUP } from "./modal";

export const userName = document.querySelector(".profile__title");
export const description = document.querySelector(".profile__description");
const addButon = document.querySelector(".profile__add-button");
const editButon = document.querySelector(".profile__edit-button");

addButon.addEventListener("click", () => {
  openPopUp(POPUP.newCardPopUp);
});

editButon.addEventListener("click", () => {
  openPopUp(POPUP.editCardPopUp);
});

export const updateProfile = (name, description) => {
  userName.textContent = name;
  description.textContent = description;
}

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

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const currentName = document.forms["edit-profile"].name.value;
  const currentDescription = document.forms["edit-profile"].description.value;

  updateProfile(currentName, currentDescription);
};