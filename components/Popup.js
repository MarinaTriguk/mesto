export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closePopupButton = this._popup.querySelector('.popup__close-icon');
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBound);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBound);
  }

  setEventListeners() {
    this._closePopupButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click',
      (evt) => {
        if (evt.target === this._popup) {
          this.close();
        }
      }
    );
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
