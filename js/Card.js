import {openPopup} from './index.js';

const imagePopup = document.querySelector('#image-popup');
const imagePopupImg = document.querySelector('.popup__image');
const imagePopupHeading = document.querySelector('.popup__image-heading');

export class Card {
  constructor (name, link, cardTemplateSelector) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
  }
  _toggleCardLike(element) {
    element.classList.toggle('photo-card__like_active');
  }
  _openImagePopup(name, link) {
    imagePopupImg.setAttribute('src', link);
    imagePopupImg.setAttribute('alt', name);
    imagePopupHeading.textContent = name;
    openPopup(imagePopup);
  }

  _createElement() {
    const photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector('.photo-card').cloneNode(true);
    photoCard.querySelector('.photo-card__heading').textContent = this._name;
    this._img = photoCard.querySelector('.photo-card__image');
    this._img.setAttribute('alt', this._name);
    this._img.setAttribute('src', this._link);
    return photoCard;
  }
  _setEventListeners(photoCard) {
    this._img.addEventListener('click', () => this._openImagePopup(this._name, this._link));
    photoCard.querySelector('.photo-card__like').addEventListener(
      'click',
      (evt) => this._toggleCardLike(evt.target)
    );
    photoCard.querySelector('.photo-card__remove').addEventListener('click', () => photoCard.remove());
  }
  createCardElement() {
    const photoCard = this._createElement();
    this._setEventListeners(photoCard);
    return photoCard;
  }
}