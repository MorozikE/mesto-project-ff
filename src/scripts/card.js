import { _deleteCard, _likeCard, deleteLikeFromCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const myUserId = "28995ef75def413f2b366450";
const cardLikeClass = "card__like-button_is-active";

const likeCard = (evt) => {
  const card = evt.target.closest(".card");
  const likeCount = card.querySelector(".card__like-count");
  if (!evt.target.classList.contains(cardLikeClass)) {
    _likeCard(card.id)
      .then((json) => {
        likeCount.textContent = json.likes.length;
      })
      .catch((err) => console.log(err))
      .finally(() => evt.target.classList.add(cardLikeClass));
  } else {
    deleteLikeFromCard(card.id)
      .then((json) => {
        likeCount.textContent = json.likes.length;
      })
      .catch((err) => console.log(err))
      .finally(() => evt.target.classList.remove(cardLikeClass));
  }
};

const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  _deleteCard(card.id)
    .catch((err) => console.log(err))
    .finally(() => {
      card.remove();
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
  const likeCount = cloneCard.querySelector(".card__like-count");

  const currentUserId = card.owner._id;
  const isILike = card.likes.some(like => like._id === myUserId);
  
  if (currentUserId != myUserId) {
    deleteBtn.remove();
  }

  if (isILike){
    likeBtn.classList.add(cardLikeClass);
  }

  cloneCard.id = card._id;
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `Фотография ${card.name}`;
  likeCount.textContent = card.likes.length;

  likeBtn.addEventListener("click", likeCardCallback);
  deleteBtn.addEventListener("click", deleteCardallback);
  cardImage.addEventListener("click", openPopUpCallback);

  return cloneCard;
}

export { createCard, likeCard, deleteCard };
