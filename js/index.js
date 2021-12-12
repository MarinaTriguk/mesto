import {Card} from '../components/Card.js';
import {initialCards} from './initial-cards.js';
import {FormValidator} from '../components/FormValidator.js';
const photoGrid = document.querySelector('.photo-grid');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileFormPopup = document.querySelector('#profile-form-popup');
const profileForm = profileFormPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profilePersonalInfo = document.querySelector('.profile__personal-info');
const inputName = document.querySelector('#input-name');
const inputPersonalInfo = document.querySelector('#input-personal-info');
const popupCloseIcons = document.querySelectorAll('.popup__close-icon');
const addCardButton = document.querySelector('.profile__add-button');
const placeFormPopup = document.querySelector('#place-form-popup');
const placeForm = placeFormPopup.querySelector('.popup__form');
const inputPlaceName = document.querySelector('#input-place-name');
const inputPlaceImgSrc = document.querySelector('#input-place-img-src');
const popupList = Array.from(document.querySelectorAll('.popup'));
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputTouchedClass: 'popup__input_touched',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_active'
};


const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();
const placeFormValidator = new FormValidator(validationSettings, placeForm);
placeFormValidator.enableValidation();

export let openedPopup = null;
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  openedPopup = popup;
  document.addEventListener('keydown', closePopupOnEsc);
}

const closePopupOnEsc = (evt) => {
  if (evt.key === 'Escape' && openedPopup !== null) {
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  openedPopup = null;
  document.removeEventListener('keydown', closePopupOnEsc);
}

function addCard(name, link, prepend = false) {
  const card = new Card(name, link, '#photo-card-template');
  const photoCard = card.createCardElement();
  if (prepend){
    photoGrid.prepend(photoCard);
  } else {
    photoGrid.append(photoCard);
  }
}

initialCards.forEach(function(card) {
  addCard(card.name, card.link);
});

profileEditButton.addEventListener(
  'click',
  function () {
    inputName.value = profileName.textContent;
    inputPersonalInfo.value = profilePersonalInfo.textContent;
    profileFormValidator.prepareFormForUserInput();
    openPopup(profileFormPopup);
  }
);

profileForm.addEventListener(
  'submit',
  function (evt) {
    evt.preventDefault();
    profileFormValidator.prepareFormForSubmit();
    if (profileFormValidator.formIsValid()) {
      profileName.textContent = inputName.value;
      profilePersonalInfo.textContent = inputPersonalInfo.value;
      closePopup(profileFormPopup);
    }
  }
)

popupCloseIcons.forEach(function(closePopupButton) {
  closePopupButton.addEventListener(
    'click',
    function (evt) {
      const popup = evt.target.closest('.popup');
      closePopup(popup);
    }
  )
});

addCardButton.addEventListener(
  'click',
  function () {
    placeForm.reset();
    placeFormValidator.prepareFormForUserInput();
    openPopup(placeFormPopup);
  }
);

placeForm.addEventListener(
  'submit',
  function (evt) {
    evt.preventDefault();
    placeFormValidator.prepareFormForSubmit();
    if (placeFormValidator.formIsValid()) {
      addCard(inputPlaceName.value, inputPlaceImgSrc.value, true);
      closePopup(placeFormPopup);
    }
  }
)

popupList.forEach(
  (popup) => {
    popup.addEventListener(
      'click',
      (evt) => {
        if (evt.target === popup) {
          closePopup(popup);
        }
      }
    );
  }
);
