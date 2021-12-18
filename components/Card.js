const imagePopup = document.querySelector('#image-popup');
const imagePopupImg = document.querySelector('.popup__image');
const imagePopupHeading = document.querySelector('.popup__image-heading');

export default class  Card{
  constructor (name, link, cardTemplateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }
  _toggleCardLike(element) {
    element.classList.toggle('photo-card__like_active');
  }

  _createElement() {
    const photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector('.photo-card').cloneNode(true);
    photoCard.querySelector('.photo-card__heading').textContent = this._name;
    this._img = photoCard.querySelector('.photo-card__image');
    this._img.setAttribute('alt', this._name);
    this._img.setAttribute('src', this._link);
    return photoCard;
  }
  _setEventListeners() {
    this._img.addEventListener('click', this._handleCardClick);
    this._photoCard.querySelector('.photo-card__like').addEventListener(
      'click',
      (evt) => this._toggleCardLike(evt.target)
    );
    this._photoCard.querySelector('.photo-card__remove').addEventListener('click', () => this._photoCard.remove());
  }
  createCardElement() {
    this._photoCard = this._createElement();
    this._setEventListeners(this._photoCard);
    return this._photoCard;
  }
}