import { openPopUp } from "./modal";
const cardTemplate = document.querySelector("#card-template").content;
const imagePopUp = document.querySelector(".popup_type_image");

const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

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

function createCard(
  card,
  deleteCardallback,
  likeCardCallback,
  openPopUpCallback
) {
  const cloneCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cloneCard.querySelector(".card__image");
  const cardTitle = cloneCard.querySelector(".card__title");
  const deleteBtn = cloneCard.querySelector(".card__delete-button");
  const likeBtn = cloneCard.querySelector(".card__like-button");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `Фотография ${card.name}`;

  likeBtn.addEventListener("click", likeCardCallback);
  deleteBtn.addEventListener("click", deleteCardallback);
  cardImage.addEventListener("click", openPopUpCallback);

  return cloneCard;
}

export { createCard, likeCard, deleteCard, openImagePopUp };
