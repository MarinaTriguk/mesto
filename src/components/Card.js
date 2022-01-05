import {userId} from "../pages/index";

export default class Card{
  constructor (
    cardData,
    {
      cardTemplateSelector, buttonLikeSelector, photoCardSelector,
      photoCardHeadingSelector, photoCardImageSelector, photoCardLikeActiveClass,
      photoCardRemoveButtonSelector, photoCardNumberLikeSelector
    },
    handleCardClick,
    handleCardRemoveClick,
    handleCardLikeClick,
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
    this._photoCardRemoveButtonSelector = photoCardRemoveButtonSelector;
    this._photoCardNumberLikeSelector = photoCardNumberLikeSelector;
    this._handleCardLikeClick = handleCardLikeClick;
    this._hasLike = this._isLikedByCurrentUser();
  }
  _isLikedByCurrentUser() {
    return this._cardData.likes.some(cardLike => cardLike._id === userId);
  }
  getCardData() {
    return this._cardData;
  }
  setHasLike(value) {
    this._hasLike = value;
  }
  setCardLikes(likes) {
    this._cardData.likes = likes;
  }
  updateCardLikes() {
    this._numberLikeHtmlElement.textContent = this._cardData.likes.length;
    if (this._hasLike) {
      this._buttonLike.classList.add(this._photoCardLikeActiveClass);
    } else {
      this._buttonLike.classList.remove(this._photoCardLikeActiveClass);
    }
  }
  _setEventListeners() {
    this._img.addEventListener('click', this._handleCardClick);
    this._buttonLike.addEventListener('click', () => this._handleCardLikeClick(this));
    this._photoCardRemoveButton.addEventListener('click', () => this._handleCardRemoveClick(this));
  }

  _canDeleteCard() {
    return userId === this._cardData.owner._id;
  }
  hasLike() {
    return this._hasLike;
  }
  createCardElement() {
    this._photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);
    this._photoCard.querySelector(this._photoCardHeadingSelector).textContent = this._cardData.name;
    this._img = this._photoCard.querySelector(this._photoCardImageSelector);
    this._img.alt = this._cardData.name;
    this._img.src = this._cardData.link;
    this._numberLikeHtmlElement = this._photoCard.querySelector(this._photoCardNumberLikeSelector);
    this._numberLikeHtmlElement.textContent = this._cardData.likes.length;
    this._photoCardRemoveButton = this._photoCard.querySelector(this._photoCardRemoveButtonSelector);
    if (!this._canDeleteCard()) {
      this._photoCardRemoveButton.remove();
    }
    this._buttonLike = this._photoCard.querySelector(this._buttonLikeSelector);
    if (this._hasLike) {
      this._buttonLike.classList.add(this._photoCardLikeActiveClass);
    }
    this._setEventListeners(this._photoCard);
    return this._photoCard;
  }

  remove() {
    this._photoCard.remove();
    this._photoCard = null;
  }
}