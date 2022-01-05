export const photoGridSectionSelector = '.photo-grid';
export const cardTemplateSelector = '#photo-card-template';
export const userNameSelector = '.profile__name';
export const userRoleSelector = '.profile__personal-info';
export const userAvatarSelector = '.profile__image';
export const profileEditButton = document.querySelector('.profile__edit-button');
export const avatarEditButton = document.querySelector('.profile__edit-avatar');
export const popupFormSelector = '.popup__form';
export const popupInputSelector = '.popup__input';
export const popupSubmitButtonSelector = '.popup__button-submit';
export const profilePopupSelector = '.profile-form-popup';
export const profileForm = document.querySelector(profilePopupSelector).querySelector(popupFormSelector);
export const inputAvatar = document.querySelector('#input-avatar');
export const inputName = document.querySelector('#input-name');
export const inputPersonalInfo = document.querySelector('#input-personal-info');
export const addCardButton = document.querySelector('.profile__add-button');
export const placePopupSelector = '.place-form-popup';
export const avatarPopupSelector = '.avatar-form-popup';
export const placeForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);
export const avatarForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);
export const popupWithImageSelector = '.image-popup';
export const popupImageSelector = '.popup__image';
export const buttonLikeSelector = '.photo-card__like';
export const photoCardSelector = '.photo-card';
export const photoCardHeadingSelector = '.photo-card__heading';
export const photoCardImageSelector = '.photo-card__image';
export const photoCardLikeActiveClass = 'photo-card__like_active';
export const photoCardNumberLikeSelector = '.photo-card__number-like';
export const popupWithConfirmationSelector = '.popup-with-confirmation';
export const buttonYesSelector = '.popup-button-yes';
export const photoCardRemoveButtonSelector = '.photo-card__remove';


export const validationSettings = {
  formSelector: popupFormSelector,
  inputSelector: '.popup__input',
  inputTouchedClass: 'popup__input_touched',
  submitButtonSelector: popupSubmitButtonSelector,
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_active'
};

export const popupSettings = {
  formSelector: popupFormSelector,
  inputSelector: popupInputSelector,
  submitButtonSelector: popupSubmitButtonSelector,
  submitButtonTextWhenNotBusy: 'Сохранить',
  submitButtonTextWhenBusy: 'Сохранение...',
};

export const userProfileSettings = {
  userNameSelector: userNameSelector,
  userRoleSelector: userRoleSelector,
  userAvatarSelector: userAvatarSelector
};

export const cardConfig = {
  cardTemplateSelector: cardTemplateSelector,
  buttonLikeSelector: buttonLikeSelector,
  photoCardSelector: photoCardSelector,
  photoCardHeadingSelector: photoCardHeadingSelector,
  photoCardImageSelector: photoCardImageSelector,
  photoCardLikeActiveClass: photoCardLikeActiveClass,
  photoCardRemoveButtonSelector: photoCardRemoveButtonSelector,
  photoCardNumberLikeSelector: photoCardNumberLikeSelector
}

export const solidColorImage = new URL('../images/solid-color-image.png', import.meta.url);
