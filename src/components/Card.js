export default class  Card{
  constructor (
    {name, link, _id, likes},
    {
      cardTemplateSelector, buttonLikeSelector, photoCardSelector,
      photoCardHeadingSelector, photoCardImageSelector, photoCardLikeActiveClass,
      photoCardLikeSelector, photoCardNumberLikeSelector
    },
    handleCardClick,
    handleCardRemoveClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._cardTemplateSelector = cardTemplateSelector;
    this._buttonLikeSelector = buttonLikeSelector;
    this._photoCardSelector = photoCardSelector;
    this._photoCardHeadingSelector = photoCardHeadingSelector;
    this._photoCardImageSelector = photoCardImageSelector;
    this._photoCardLikeActiveClass = photoCardLikeActiveClass;
    this._handleCardClick = handleCardClick;
    this._handleCardRemoveClick = handleCardRemoveClick;
    this._photoCardLikeSelector = photoCardLikeSelector;
    this._photoCardNumberLikeSelector = photoCardNumberLikeSelector;
  }


  _createElement() {
    const photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);
    photoCard.querySelector(this._photoCardHeadingSelector).textContent = this._name;
    this._img = photoCard.querySelector(this._photoCardImageSelector);
    this._img.setAttribute('alt', this._name);
    this._img.setAttribute('src', this._link);
    this._numberLikeHtmlElement = photoCard.querySelector(this._photoCardNumberLikeSelector);
    this._numberLikeHtmlElement.textContent = this._likes.length;
    return photoCard;
  }

  _setEventListeners() {
    this._img.addEventListener('click', this._handleCardClick);
    this._buttonLike.addEventListener(
      'click',
      () => this._buttonLike.classList.toggle(this._photoCardLikeActiveClass)
    );
    this._photoCard.querySelector('.photo-card__remove').addEventListener(
      'click',
      () => {
        this._handleCardRemoveClick(this);
      }
    );
  }

  createCardElement() {
    this._photoCard = this._createElement();
    this._buttonLike = this._photoCard.querySelector(this._buttonLikeSelector);
    this._setEventListeners(this._photoCard);
    return this._photoCard;
  }
}