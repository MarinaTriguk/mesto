import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  validationSettings,
  profileForm,
  placeForm,
  avatarForm,
  popupWithImageSelector,
  popupImageSelector,
  popupWithConfirmationSelector,
  buttonYesSelector,
  userProfileSettings,
  solidColorImage,
  cardConfig,
  photoGridSectionSelector,
  profilePopupSelector,
  popupSettings,
  placePopupSelector,
  avatarPopupSelector,
  profileEditButton,
  avatarEditButton,
  addCardButton,
  inputName,
  inputPersonalInfo,
} from "../utils/constants.js"

let userId = null;

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

const userInfo = new UserInfo(
  userProfileSettings,
  {
    name: '',
    about: '',
    avatar: solidColorImage,
  }
);

const cardListSection = new Section(
  {
    data: [],
    renderer: (cardItem) => {
      const cardElement = createCardElement(cardItem);
      cardListSection.addItem(cardElement);
    },
  },
  photoGridSectionSelector
);

popupWithConfirmation.setEventListeners();

const createCardElement = (cardItem) => {
  const card = new Card(
    cardItem,
    userId,
    cardConfig,
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
      if (!aCard.hasLike()) {
        api.putLike(aCard.getCardData()._id)
          .then((res) => {
            aCard.setCardLikes(res.likes);
            aCard.setHasLike(true);
            aCard.updateCardLikes();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.deleteLike(aCard.getCardData()._id)
          .then((res) => {
            aCard.setCardLikes(res.likes);
            aCard.setHasLike(false);
            aCard.updateCardLikes();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.createCardElement();
}

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([profile, initialCards]) => {
    userInfo.setUserInfo(profile);
    userInfo.setUserAvatar(profile.avatar);
    userId = profile._id;

    cardListSection.setItems(initialCards);
    cardListSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  popupSettings,
  (data) => {
    profilePopup.setIsBusy();
    api.updateProfile(data.name, data.about)
      .then (() => {
        userInfo.setUserInfo(data);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => profilePopup.setIsBusy(false));
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
        placePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => placePopup.setIsBusy(false));
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
      })
      .finally(() => avatarPopup.setIsBusy(false));
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

