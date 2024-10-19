function openPopUp(popUp, callback) {
  const popUpCloseBtn = popUp.querySelector(".popup__close");
  popUp.classList.add("popup_is-opened");

  popUp.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopUp(evt.target);
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      closePopUp(popUp);
    }
  });

  popUpCloseBtn.addEventListener("click", () => {
    closePopUp(popUp);
  });
  callback(popUp);
}

function closePopUp(popUp) {
  popUp.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      closePopUp(popUp);
    }
  });
}

export { openPopUp, closePopUp };
