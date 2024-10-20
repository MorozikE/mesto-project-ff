const escBtnCode = "Escape";

const closePopupByOverlay = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopUp(evt.target);
  }
};

const closePopupByEsc = (evt) => {
  if (evt.key === escBtnCode) {
    closePopUp(document.querySelector(".popup_is-opened"));
  }
};

function openPopUp(popUp) {
  popUp.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopUp(popUp) {
  popUp.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

export { openPopUp, closePopUp, closePopupByOverlay };
