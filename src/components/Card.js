export default class  Card{
  constructor (
    {name, link},
    {
      cardTemplateSelector, buttonLikeSelector, photoCardSelector,
      photoCardHeadingSelector, photoCardImageSelector, photoCardLikeActiveClass
    },
    handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._buttonLikeSelector = buttonLikeSelector;
    this._photoCardSelector = photoCardSelector;
    this._photoCardHeadingSelector = photoCardHeadingSelector;
    this._photoCardImageSelector = photoCardImageSelector;
    this._photoCardLikeActiveClass = photoCardLikeActiveClass;
    this._handleCardClick = handleCardClick;
  }

   _createElement() {
    const photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);
    photoCard.querySelector(this._photoCardHeadingSelector).textContent = this._name;
    this._img = photoCard.querySelector(this._photoCardImageSelector);
    this._img.setAttribute('alt', this._name);
    this._img.setAttribute('src', this._link);
    return photoCard;
  }

  _setEventListeners() {
    this._img.addEventListener('click', this._handleCardClick);
    this._buttonLike.addEventListener(
      'click',
      () => this._buttonLike.classList.toggle(this._photoCardLikeActiveClass)
    );
    this._photoCard.querySelector('.photo-card__remove').addEventListener('click', () => this._photoCard.remove());
  }

  createCardElement() {
    this._photoCard = this._createElement();
    this._buttonLike = this._photoCard.querySelector(this._buttonLikeSelector);
    this._setEventListeners(this._photoCard);
    return this._photoCard;
  }
}