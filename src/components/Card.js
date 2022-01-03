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
    canDeleteCardCallback,
    cardIsLiked,
    putLikeCallback,
    deleteLikeCallback
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
    this._cardIsLiked = cardIsLiked;
    this._putLikeCallback = putLikeCallback;
    this._deleteLikeCallback = deleteLikeCallback;
  }

  getCardData() {
    return this._cardData;
  }
  _setEventListeners() {
    this._img.addEventListener('click', this._handleCardClick);
    this._buttonLike.addEventListener(
      'click',
      () => {
        if (!this._hasLike) {
          this._putLikeCallback(this)
            .then((res) => {
              this._cardData = res;
              this._buttonLike.classList.add(this._photoCardLikeActiveClass);
              this._numberLikeHtmlElement.textContent = this._cardData.likes.length;
              this._hasLike = true;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this._deleteLikeCallback(this)
            .then((res) => {
              this._cardData = res;
              this._buttonLike.classList.remove(this._photoCardLikeActiveClass);
              this._numberLikeHtmlElement.textContent = this._cardData.likes.length;
              this._hasLike = false;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    );
    this._photoCardRemoveButton.addEventListener(
      'click',
      () => {
        this._handleCardRemoveClick(this);
      }
    );
  }

  createCardElement() {
    this._photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);
    this._photoCard.querySelector(this._photoCardHeadingSelector).textContent = this._cardData.name;
    this._img = this._photoCard.querySelector(this._photoCardImageSelector);
    this._img.setAttribute('alt', this._cardData.name);
    this._img.setAttribute('src', this._cardData.link);
    this._numberLikeHtmlElement = this._photoCard.querySelector(this._photoCardNumberLikeSelector);
    this._numberLikeHtmlElement.textContent = this._cardData.likes.length;
    this._photoCardRemoveButton = this._photoCard.querySelector(this._photoCardRemoveButtonSelector);
    if (!this._canDeleteCardCallback(this)) {
      this._photoCardRemoveButton.remove();
    }
    this._buttonLike = this._photoCard.querySelector(this._buttonLikeSelector);
    this._hasLike = this._cardIsLiked(this);
    if (this._hasLike) {
      this._buttonLike.classList.add(this._photoCardLikeActiveClass);
    }
    this._setEventListeners(this._photoCard);
    return this._photoCard;
  }

  remove() {
    this._photoCard.remove();
  }
}