const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "f8900c3e-750e-450e-aede-13b29edad920",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, config).then(handleResponse);
};

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, config).then(handleResponse);
};

const updateProfile = (name, about) => {
  const localConfig = JSON.parse(JSON.stringify(config));
  localConfig.method = "PATCH";
  localConfig.body = JSON.stringify({ name: name, about: about });
  return fetch(`${config.baseUrl}/users/me`, localConfig).then(handleResponse);
};

const addNewCard = (name, link) => {
  const localConfig = JSON.parse(JSON.stringify(config));
  localConfig.method = "POST";
  localConfig.body = JSON.stringify({ name: name, link: link });
  return fetch(`${config.baseUrl}/cards`, localConfig).then(handleResponse);
};

const deleteCard = (cardId) => {
  const localConfig = JSON.parse(JSON.stringify(config));
  localConfig.method = "DELETE";
  return fetch(`${config.baseUrl}/cards/${cardId}`, localConfig).then(handleResponse);
};

const likeCard = (cardId) => {
  const localConfig = JSON.parse(JSON.stringify(config));
  localConfig.method = "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, localConfig).then(handleResponse);
};

const deleteLikeFromCard = (cardId) => {
  const localConfig = JSON.parse(JSON.stringify(config));
  localConfig.method = "DELETE";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, localConfig).then(handleResponse);
};

const updateAvatar = (avatarUrl) => {
  const localConfig = JSON.parse(JSON.stringify(config));
  localConfig.method = "PATCH";
  localConfig.body = JSON.stringify({ avatar: avatarUrl });
  return fetch(`${config.baseUrl}/users/me/avatar`, localConfig).then(handleResponse);
};

export {
  getUserInfo,
  getCards,
  updateProfile,
  addNewCard,
  deleteCard,
  likeCard,
  deleteLikeFromCard,
  updateAvatar,
};
