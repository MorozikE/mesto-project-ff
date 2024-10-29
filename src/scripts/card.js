import {
  deleteCard as dCard,
  likeCard as lCard,
  deleteLikeFromCard,
} from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const cardLikeClass = "card__like-button_is-active";

const likeCard = (evt) => {
  const card = evt.target.closest(".card");
  const likeCount = card.querySelector(".card__like-count");

  const likeMethod = evt.target.classList.contains(cardLikeClass) ? deleteLikeFromCard : lCard;
  likeMethod(card.id) 
          .then((res) => {
             likeCount.textContent = res.likes.length; 
             evt.target.classList.toggle(cardLikeClass) 
          })
  .catch(err => console.log(err));
};

const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  dCard(card.id)
    .then(() => card.remove())
    .catch((err) => console.log(err));
};

function createCard(
  myUserId,
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
  const isILike = card.likes.some((like) => like._id === myUserId);

  if (currentUserId != myUserId) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener("click", deleteCardallback);
  }

  if (isILike) {
    likeBtn.classList.add(cardLikeClass);
  }

  cloneCard.id = card._id;
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `Фотография ${card.name}`;
  likeCount.textContent = card.likes.length;

  likeBtn.addEventListener("click", likeCardCallback);
  cardImage.addEventListener("click", openPopUpCallback);

  return cloneCard;
}

export { createCard, likeCard, deleteCard };
