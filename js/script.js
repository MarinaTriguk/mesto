const photoCardTemplate = document.querySelector('#photo-card-template');
const photoGrid = document.querySelector('.photo-grid');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileFormPopup = document.querySelector('#profile-form-popup');
const profileName = document.querySelector('.profile__name');
const profilePersonalInfo = document.querySelector('.profile__personal-info');
const inputName = document.querySelector('#input-name');
const inputPersonalInfo = document.querySelector('#input-personal-info');
const popupCloseIcons = document.querySelectorAll('.popup__close-icon');
const addCardButton = document.querySelector('.profile__add-button');
const placeFormPopup = document.querySelector('#place-form-popup');
const inputPlaceName = document.querySelector('#input-place-name');
const inputPlaceImgSrc = document.querySelector('#input-place-img-src');
const imagePopup = document.querySelector('#image-popup');
const imagePopupImg = document.querySelector('.popup__image');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function createCard(name, link) {
  const photoCard = photoCardTemplate.content.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__heading').textContent = name;
  const img = photoCard.querySelector('.photo-card__image');
  img.setAttribute('alt', name);
  img.setAttribute('src', link);
  img.addEventListener('click', function() {
    imagePopupImg.setAttribute('src', link);
    imagePopupImg.setAttribute('alt', name);
    openPopup(imagePopup);
  });
  photoCard.querySelector('.photo-card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('photo-card__like_active');
  })
  photoCard.querySelector('.photo-card__remove').addEventListener('click', function() {
    photoCard.remove();
  });
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
    openPopup(profileFormPopup);
    inputName.value = profileName.textContent;
    inputPersonalInfo.value = profilePersonalInfo.textContent;
  }
);

profileFormPopup.querySelector('.popup__form').addEventListener(
  'submit',
  function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profilePersonalInfo.textContent = inputPersonalInfo.value;
    closePopup(profileFormPopup);
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
    openPopup(placeFormPopup);
  }
);

placeFormPopup.querySelector('.popup__form').addEventListener(
  'submit',
  function (evt) {
    evt.preventDefault();
    addCard(inputPlaceName.value, inputPlaceImgSrc.value, true);
    inputPlaceName.value = '';
    inputPlaceImgSrc.value = '';
    closePopup(placeFormPopup);
  }
)



