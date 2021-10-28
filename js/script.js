const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachajevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/goraElbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombaj.jpg'
  },
  {
    name: 'Горы',
    link: './images/claudio-schwarz.jpg'
  },
  {
    name: 'Горный лес',
    link: './images/harrison-hargrave.jpg'
  },
  {
    name: 'Каньон',
    link: './images/jonatan-pie.jpg'
  },
];
const photoCardTemplate = document.querySelector('#photo-card-template');
const photoGrid = document.querySelector('.photo-grid');

function addCard(name, link, prepend = false) {
  const photoCard = photoCardTemplate.content.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__heading').textContent = name;
  const img = photoCard.querySelector('.photo-card__image');
  img.setAttribute('alt', name);
  img.setAttribute('src', link);
  img.addEventListener('click', function() {
    const popup = document.querySelector('#image-popup');
    const container = popup.querySelector('.popup__container');
    const popupImg = document.createElement('img');
    popupImg.classList.add('popup__image');
    popupImg.setAttribute('src', link);
    popupImg.setAttribute('src', link);
    container.querySelectorAll('.popup__image').forEach(function(element) {
      element.remove();
    });
    container.append(popupImg);
    popup.classList.add('popup_opened');
  });
  photoCard.querySelector('.photo-card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('photo-card__like_active');
  })
  photoCard.querySelector('.photo-card__remove').addEventListener('click', function() {
    photoCard.remove();
  });
  if (prepend) {
    photoGrid.prepend(photoCard);
  } else {
    photoGrid.append(photoCard);
  }
}

initialCards.forEach(function(card) {
  addCard(card.name, card.link);
});

document.querySelector('.profile__edit-button').addEventListener(
  'click',
  function () {
    document.querySelector('#profile-form-popup').classList.add('popup_opened');
    document.querySelector('#input-name').value = document.querySelector('.profile__name').textContent;
    document.querySelector('#input-personal-info').value = document.querySelector('.profile__personal-info').textContent;
  }
);

document.querySelector('#profile-form-popup').querySelector('.popup__form').addEventListener(
  'submit',
  function (evt) {
    evt.preventDefault();
    document.querySelector('.profile__name').textContent = document.querySelector('#input-name').value;
    document.querySelector('.profile__personal-info').textContent = document.querySelector('#input-personal-info').value;
    document.querySelector('.popup').classList.remove('popup_opened');
  }
)

document.querySelectorAll('.popup__close-icon').forEach(function(closePopupButton) {
  closePopupButton.addEventListener(
    'click',
    function (evt) {
      const popup = evt.target.closest('.popup');
      popup.classList.remove('popup_opened');
    }
  )
});

document.querySelector('.profile__add-button').addEventListener(
  'click',
  function () {
    document.querySelector('#place-form-popup').classList.add('popup_opened');
  }
);

document.querySelector('#place-form-popup').querySelector('.popup__form').addEventListener(
  'submit',
  function (evt) {
    evt.preventDefault();
    addCard(
      document.querySelector('#input-place-name').value,
      document.querySelector('#input-place-img-src').value,
      true
    )
    document.querySelector('#place-form-popup').classList.remove('popup_opened');
  }
)



