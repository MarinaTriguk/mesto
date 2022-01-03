import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const photoGridSectionSelector = '.photo-grid';
const cardTemplateSelector = '#photo-card-template';
const userNameSelector = '.profile__name';
const userRoleSelector = '.profile__personal-info';
const userAvatarSelector = '.profile__image';
const profileEditButton = document.querySelector('.profile__edit-button');
const avatarEditButton = document.querySelector('.profile__edit-avatar');
const popupFormSelector = '.popup__form';
const popupInputSelector = '.popup__input';
const popupSubmitButtonSelector = '.popup__button-submit';
const profilePopupSelector = '.profile-form-popup';
const profileForm = document.querySelector(profilePopupSelector).querySelector(popupFormSelector);
const inputAvatar = document.querySelector('#input-avatar');
const inputName = document.querySelector('#input-name');
const inputPersonalInfo = document.querySelector('#input-personal-info');
const addCardButton = document.querySelector('.profile__add-button');
const placePopupSelector = '.place-form-popup';
const avatarPopupSelector = '.avatar-form-popup';
const placeForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);
const avatarForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);
const popupWithImageSelector = '.image-popup';
const popupImageSelector = '.popup__image';
const buttonLikeSelector = '.photo-card__like';
const photoCardSelector = '.photo-card';
const photoCardHeadingSelector = '.photo-card__heading';
const photoCardImageSelector = '.photo-card__image';
const photoCardLikeActiveClass = 'photo-card__like_active';
const photoCardLikeSelector = '.photo-card__like';
const photoCardNumberLikeSelector = '.photo-card__number-like';
const popupWithConfirmationSelector = '.popup-with-confirmation';
const buttonYesSelector = '.popup-button-yes';
const photoCardRemoveButtonSelector = '.photo-card__remove';

let cardListSection;

const validationSettings = {
  formSelector: popupFormSelector,
  inputSelector: '.popup__input',
  inputTouchedClass: 'popup__input_touched',
  submitButtonSelector: popupSubmitButtonSelector,
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_active'
};

const popupSettings = {
  formSelector: popupFormSelector,
  inputSelector: popupInputSelector,
  submitButtonSelector: popupSubmitButtonSelector,
  submitButtonTextWhenNotBusy: 'Сохранить',
  submitButtonTextWhenBusy: 'Сохранение...',
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
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);
avatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage({
  popupSelector: popupWithImageSelector,
  popupImageSelector: popupImageSelector
});

const popupWithConfirmation = new PopupWithConfirmation(
  {
    popupSelector: popupWithConfirmationSelector,
    buttonYesSelector: buttonYesSelector
  }
);
popupWithConfirmation.setEventListeners();

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
      photoCardRemoveButtonSelector: photoCardRemoveButtonSelector,
      photoCardLikeSelector: photoCardLikeSelector,
      photoCardNumberLikeSelector: photoCardNumberLikeSelector
    },
    () => {
      popupWithImage.open(cardItem);
    },
    (aCard) => {
      popupWithConfirmation.setButtonYesCallback(
        () => {
          api.deleteCard(aCard.getCardData()._id)
            .then(() => {
              popupWithConfirmation.close();
              aCard.remove();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      )
      popupWithConfirmation.open();
    },
    (aCard) => {
      const userId = userInfo.getUserInfo()._id;
      const cardOwnerId = aCard.getCardData().owner._id
      return userId === cardOwnerId;
    },

    (aCard) => {
      const userId = userInfo.getUserInfo()._id;
      const cardLikes = aCard.getCardData().likes;
      let foundLike = false;
      cardLikes.forEach((cardLike) => {
        if (cardLike._id === userId) {
          foundLike = true;
        }
      });
      return foundLike;
    },
    (aCard) => {
      return api.putLike(aCard.getCardData()._id);
    },
    (aCard) => {
      return api.deleteLike(aCard.getCardData()._id);
    }


  );
  return card.createCardElement();
}





let userInfo;

api.getProfile()
  .then(res => {
    userInfo = new UserInfo(
      {
        userNameSelector: userNameSelector,
        userRoleSelector: userRoleSelector,
        userAvatarSelector: userAvatarSelector
      },
      res
    );
    api.getInitialCards()
      .then(res => {
        cardListSection = new Section(
          {
            data: res,
            renderer: (cardItem) => {
              const cardElement = createCardElement(cardItem);
              cardListSection.addItem(cardElement);
            },
          },
          photoGridSectionSelector
        );
        cardListSection.renderItems();
      });
  })
  .catch((err) => {
    console.log(err);
  });



const profilePopup = new PopupWithForm(
  profilePopupSelector,
  popupSettings,
  (data) => {
    profilePopup.setIsBusy();
    api.updateProfile(data.userName, data.userRole)
      .then (() => {
        userInfo.setUserInfo(data);
        profilePopup.close();
        profilePopup.setIsBusy(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const placePopup = new PopupWithForm (
  placePopupSelector,
  popupSettings,
  (data) => {
    placePopup.setIsBusy();
    api.addNewCard(data.name, data.link)
      .then(res => {
        const cardElement = createCardElement(res);
        cardListSection.addItem(cardElement, true);
        profilePopup.setIsBusy(false);
        placePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const avatarPopup = new PopupWithForm (
  avatarPopupSelector,
  popupSettings,
  (data) => {
    avatarPopup.setIsBusy();
    api.updateUserAvatar(data.avatar)
      .then(res => {
        userInfo.setUserAvatar(res.avatar);
        avatarPopup.setIsBusy(false);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

profileEditButton.addEventListener(
  'click',
  () => {
    const {name, about} = userInfo.getUserInfo();
    inputName.value = name;
    inputPersonalInfo.value = about;
    profileFormValidator.prepareFormForUserInput();
    profilePopup.open();
  }
);

avatarEditButton.addEventListener(
  'click',
  () => {
    const {avatar} = userInfo.getUserInfo();
    inputAvatar.value = avatar;
    avatarFormValidator.prepareFormForUserInput();
    avatarPopup.open();
  }
)

addCardButton.addEventListener(
  'click',
  function () {
    placeForm.reset();
    placeFormValidator.prepareFormForUserInput();
    placePopup.open();
  }
);

[profilePopup, placePopup, avatarPopup, popupWithImage].forEach(
  item => item.setEventListeners()
);

