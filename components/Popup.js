class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closePopupButton = this._popup.querySelector('.popup__close-icon');
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._closePopupButton.addEventListener('click', () => this.closePopup());
    this._popup.addEventListener('click',
      (evt) => {
        if (evt.target === this._popup) {
          this.closePopup();
        }
      }
    );
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }
}
