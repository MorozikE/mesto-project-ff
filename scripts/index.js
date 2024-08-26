// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
const createCard = (card, callBack) => {
  const cloneCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cloneCard.querySelector('.card__image');
  const cardTitle = cloneCard.querySelector('.card__title');
  const deleteBtn = cloneCard.querySelector('.card__delete-button');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;

  deleteBtn.addEventListener('click', callBack);

  return cloneCard;
};
// @todo: Функция удаления карточки
const deleteCard = (evt) => {
  evt.target.parentElement.remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardForRender = createCard(card, deleteCard);
  cardList.append(cardForRender);
});
