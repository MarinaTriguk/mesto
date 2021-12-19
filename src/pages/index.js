import './index.css';

import Card from '../components/Card.js';
import {initialCards} from '../utils/initial-cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const photoGridSectionSelector = '.photo-grid';
const cardTemplateSelector = '#photo-card-template';
const userNameSelector = '.profile__name';
const userRoleSelector = '.profile__personal-info';
const profileEditButton = document.querySelector('.profile__edit-button');
const popupFormSelector = '.popup__form';
const popupInputSelector = '.popup__input';
const profilePopupSelector = '.profile-form-popup';
const profileForm = document.querySelector(profilePopupSelector).querySelector(popupFormSelector);
const inputName = document.querySelector('#input-name');
const inputPersonalInfo = document.querySelector('#input-personal-info');
const addCardButton = document.querySelector('.profile__add-button');
const placePopupSelector = '.place-form-popup';
const placeForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);
const popupWithImageSelector = '.image-popup';
const popupImageSelector = '.popup__image';
const validationSettings = {
  formSelector: popupFormSelector,
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

const popupWithImage = new PopupWithImage({
  popupSelector: popupWithImageSelector,
  popupImageSelector: popupImageSelector
});

const createCardElement = (cardItem) => {
  const card = new Card(
    cardItem,
    cardTemplateSelector,
    () => {
      popupWithImage.open(cardItem);
    }
  );
  return card.createCardElement();
}

const cardListSection = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCardElement(cardItem);
      cardListSection.addItem(cardElement);
    },
  },
  photoGridSectionSelector
);

const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userRoleSelector: userRoleSelector,
  initialUserName: 'Жак-Ив Кусто',
  initialUserRole: 'Исследователь океана'
});

const profilePopup = new PopupWithForm(
  {
    popupSelector: profilePopupSelector,
    formSelector: popupFormSelector,
    inputSelector: popupInputSelector
  },
  (data) => {
    profileFormValidator.prepareFormForSubmit();
    userInfo.setUserInfo(data);
    profilePopup.close();
  }
);

const placePopup = new PopupWithForm (
  {
    popupSelector: placePopupSelector,
    formSelector: popupFormSelector,
    inputSelector: popupInputSelector
  },
  (data) => {
    placeFormValidator.prepareFormForSubmit();
    const cardElement = createCardElement(data);
    cardListSection.addItem(cardElement, true);
    placePopup.close();
  }
);


profileEditButton.addEventListener(
  'click',
  () => {
    const {name, role} = userInfo.getUserInfo();
    inputName.value = name;
    inputPersonalInfo.value = role;
    profileFormValidator.prepareFormForUserInput();
    profilePopup.open();
  }
);

addCardButton.addEventListener(
  'click',
  function () {
    placeForm.reset();
    placeFormValidator.prepareFormForUserInput();
    placePopup.open();
  }
);


profilePopup.setEventListeners();
placePopup.setEventListeners();
popupWithImage.setEventListeners();
cardListSection.renderItems();
