const photoCardTemplate = document.querySelector('#photo-card-template');
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
const imagePopup = document.querySelector('#image-popup');
const imagePopupImg = document.querySelector('.popup__image');
const imagePopupHeading = document.querySelector('.popup__image-heading');
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
let openedPopup = null;

const closePopupOnEsc = (evt) => {
  if (evt.key === 'Escape' && openedPopup !== null) {
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  openedPopup = popup;
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  openedPopup = null;
  document.removeEventListener('keydown', closePopupOnEsc);
}

const openImagePopup = (name, link) => {
  imagePopupImg.setAttribute('src', link);
  imagePopupImg.setAttribute('alt', name);
  imagePopupHeading.textContent = name;
  openPopup(imagePopup);
}

const toggleCardLike = (element) => element.classList.toggle('photo-card__like_active')
function createCard(name, link) {
  const photoCard = photoCardTemplate.content.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__heading').textContent = name;
  const img = photoCard.querySelector('.photo-card__image');
  img.setAttribute('alt', name);
  img.setAttribute('src', link);
  img.addEventListener('click', () => openImagePopup(name, link));
  photoCard.querySelector('.photo-card__like').addEventListener(
    'click',
    (evt) => toggleCardLike(evt.target)
  );
  photoCard.querySelector('.photo-card__remove').addEventListener('click', () => photoCard.remove());
  return photoCard;
}

function addCard(name, link, prepend = false) {
  const photoCard = createCard(name, link);
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
    prepareFormForUserInput(profileForm, validationSettings);
    openPopup(profileFormPopup);
  }
);

profileForm.addEventListener(
  'submit',
  function (evt) {
    evt.preventDefault();
    prepareFormForSubmit(profileForm, validationSettings);
    if (formIsValid(profileForm, validationSettings)) {
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
    prepareFormForUserInput(placeForm, validationSettings);
    openPopup(placeFormPopup);
  }
);

placeForm.addEventListener(
  'submit',
  function (evt) {
    evt.preventDefault();
    prepareFormForSubmit(placeForm, validationSettings);
    if (formIsValid(placeForm, validationSettings)) {
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

enableValidation(validationSettings);
