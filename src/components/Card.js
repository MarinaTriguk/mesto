export default class Card{
  constructor (
    cardData,
    {
      cardTemplateSelector, buttonLikeSelector, photoCardSelector,
      photoCardHeadingSelector, photoCardImageSelector, photoCardLikeActiveClass, photoCardRemoveButtonSelector,
      photoCardLikeSelector, photoCardNumberLikeSelector
    },
    handleCardClick,
    handleCardRemoveClick,
    canDeleteCardCallback
  ) {
    this._cardData = cardData;
    this._cardTemplateSelector = cardTemplateSelector;
    this._buttonLikeSelector = buttonLikeSelector;
    this._photoCardSelector = photoCardSelector;
    this._photoCardHeadingSelector = photoCardHeadingSelector;
    this._photoCardImageSelector = photoCardImageSelector;
    this._photoCardLikeActiveClass = photoCardLikeActiveClass;
    this._handleCardClick = handleCardClick;
    this._handleCardRemoveClick = handleCardRemoveClick;
    this._canDeleteCardCallback = canDeleteCardCallback;
    this._photoCardLikeSelector = photoCardLikeSelector;
    this._photoCardRemoveButtonSelector = photoCardRemoveButtonSelector;
    this._photoCardNumberLikeSelector = photoCardNumberLikeSelector;
  }


  _createElement() {
    const photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);
    photoCard.querySelector(this._photoCardHeadingSelector).textContent = this._cardData.name;
    this._img = photoCard.querySelector(this._photoCardImageSelector);
    this._img.setAttribute('alt', this._cardData.name);
    this._img.setAttribute('src', this._cardData.link);
    this._numberLikeHtmlElement = photoCard.querySelector(this._photoCardNumberLikeSelector);
    this._numberLikeHtmlElement.textContent = this._cardData.likes.length;
    this._photoCardRemoveButton = photoCard.querySelector(this._photoCardRemoveButtonSelector);
    if (!this._canDeleteCardCallback(this)) {
      this._photoCardRemoveButton.remove();
    }
    return photoCard;
  }

  getCardData() {
    return this._cardData;
  }
  _setEventListeners() {
    this._img.addEventListener('click', this._handleCardClick);
    this._buttonLike.addEventListener(
      'click',
      () => this._buttonLike.classList.toggle(this._photoCardLikeActiveClass)
    );
    this._photoCardRemoveButton.addEventListener(
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

  remove() {
    this._photoCard.remove();
  }
}