import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

const photoGridSectionSelector = '.photo-grid';
const cardTemplateSelector = '#photo-card-template';
const userNameSelector = '.profile__name';
const userRoleSelector = '.profile__personal-info';
const userAvatarSelector = '.profile__image';
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
const buttonLikeSelector = '.photo-card__like';
const photoCardSelector = '.photo-card';
const photoCardHeadingSelector = '.photo-card__heading';
const photoCardImageSelector = '.photo-card__image';
const photoCardLikeActiveClass = 'photo-card__like_active';
const photoCardLikeSelector = '.photo-card__like';
const photoCardNumberLikeSelector = '.photo-card__number-like';

let cardListSection;

const validationSettings = {
  formSelector: popupFormSelector,
  inputSelector: '.popup__input',
  inputTouchedClass: 'popup__input_touched',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_active'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  headers: {
    authorization: '335a768c-ca5d-40e4-8a41-9424745573a9',
    'Content-Type': 'application/json'
  }
});

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
    {
      cardTemplateSelector: cardTemplateSelector,
      buttonLikeSelector: buttonLikeSelector,
      photoCardSelector: photoCardSelector,
      photoCardHeadingSelector: photoCardHeadingSelector,
      photoCardImageSelector: photoCardImageSelector,
      photoCardLikeActiveClass: photoCardLikeActiveClass,
      photoCardLikeSelector: photoCardLikeSelector,
      photoCardNumberLikeSelector: photoCardNumberLikeSelector
    },
    () => {
      popupWithImage.open(cardItem);
    }
  );
  return card.createCardElement();
}

api.getInitialCards()
  .then(res => {
    cardListSection = new Section(
      {
        data: res,
        renderer: (cardItem) => {
          console.log(cardItem);
          const cardElement = createCardElement(cardItem);
          cardListSection.addItem(cardElement);
        },
      },
      photoGridSectionSelector
    );
    cardListSection.renderItems();
  });



const userInfo = new UserInfo(
  {
    userNameSelector: userNameSelector,
    userRoleSelector: userRoleSelector,
    userAvatarSelector: userAvatarSelector
  },
  {
    initialUserName: '',
    initialUserRole: '',
    initialUserAvatar: ''
  }
);

api.getProfile()
  .then(res => {
    userInfo.setUserInfo({userName: res.name, userRole: res.about, userAvatar: res.avatar});
  })
  .catch((err) => {
    console.log(err);
  });



const profilePopup = new PopupWithForm(
  {
    popupSelector: profilePopupSelector,
    formSelector: popupFormSelector,
    inputSelector: popupInputSelector
  },
  (data) => {
    api.updateProfile(data.userName, data.userRole)
      .then (res => {
        profileFormValidator.prepareFormForSubmit();
        userInfo.setUserInfo(data);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const placePopup = new PopupWithForm (
  {
    popupSelector: placePopupSelector,
    formSelector: popupFormSelector,
    inputSelector: popupInputSelector
  },
  (data) => {
    api.addNewCard(data.name, data.link)
      .then(res => {
        placeFormValidator.prepareFormForSubmit();
        const cardElement = createCardElement(data);
        cardListSection.addItem(cardElement, true);
        placePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
