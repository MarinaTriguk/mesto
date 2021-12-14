import Card from '../components/Card.js';
import {initialCards} from '../utils/initial-cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";

const photoGridSectionSelector = '.photo-grid';
const photoGrid = document.querySelector(photoGridSectionSelector);
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

const cardList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem.name, cardItem.link, '#photo-card-template');
      const cardElement = card.createCardElement();

      return cardElement;
    },
  },
  photoGridSectionSelector
);

document.addEventListener('DOMContentLoaded', function() {
  cardList.renderItems();
});

const profilePopup = new PopupWithForm ('.profile-form-popup', (evt) => {
  evt.preventDefault();
  profileFormValidator.prepareFormForSubmit();
  if (profileFormValidator.formIsValid()) {
    profileName.textContent = inputName.value;
    profilePersonalInfo.textContent = inputPersonalInfo.value;
    profilePopup.close();
  }});

const placePopup = new PopupWithForm ( '.place-form-popup', (evt) => {
  evt.preventDefault();
  placeFormValidator.prepareFormForSubmit();
  if (placeFormValidator.formIsValid()) {
    const item = {
      name: inputPlaceName.value,
      link: inputPlaceImgSrc.value
    };
    cardList.appendItem(item);
    placePopup.close();
  }
  }
);


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


