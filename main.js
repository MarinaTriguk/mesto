/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Api)\n/* harmony export */ });\nclass Api {\n  constructor({\n    baseUrl,\n    headers\n  }) {\n    this.baseUrl = baseUrl;\n    this.headers = headers;\n  }\n\n  _request(address, method = 'GET', body = null) {\n    return fetch(this.baseUrl + address, {\n      method: method,\n      headers: this.headers,\n      body: body !== null ? JSON.stringify(body) : undefined\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  getProfile() {\n    return this._request('/users/me');\n  }\n\n  getInitialCards() {\n    return this._request('/cards');\n  }\n\n  updateProfile(userName, userRole) {\n    return this._request('/users/me', 'PATCH', {\n      name: userName,\n      about: userRole\n    });\n  }\n\n  addNewCard(cardName, cardLink) {\n    return this._request('/cards', 'POST', {\n      name: cardName,\n      link: cardLink\n    });\n  }\n\n  deleteCard(cardId) {\n    return this._request('/cards/' + cardId, 'DELETE');\n  }\n\n  putLike(cardId) {\n    return this._request('/cards/' + cardId + '/likes', 'PUT');\n  }\n\n  deleteLike(cardId) {\n    return this._request('/cards/' + cardId + '/likes', 'DELETE');\n  }\n\n  updateUserAvatar(avatar) {\n    return this._request('/users/me/avatar', 'PATCH', {\n      avatar: avatar\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\n  constructor(cardData, {\n    cardTemplateSelector,\n    buttonLikeSelector,\n    photoCardSelector,\n    photoCardHeadingSelector,\n    photoCardImageSelector,\n    photoCardLikeActiveClass,\n    photoCardRemoveButtonSelector,\n    photoCardLikeSelector,\n    photoCardNumberLikeSelector\n  }, handleCardClick, handleCardRemoveClick, canDeleteCardCallback, cardIsLiked, putLikeCallback, deleteLikeCallback) {\n    this._cardData = cardData;\n    this._cardTemplateSelector = cardTemplateSelector;\n    this._buttonLikeSelector = buttonLikeSelector;\n    this._photoCardSelector = photoCardSelector;\n    this._photoCardHeadingSelector = photoCardHeadingSelector;\n    this._photoCardImageSelector = photoCardImageSelector;\n    this._photoCardLikeActiveClass = photoCardLikeActiveClass;\n    this._handleCardClick = handleCardClick;\n    this._handleCardRemoveClick = handleCardRemoveClick;\n    this._canDeleteCardCallback = canDeleteCardCallback;\n    this._photoCardLikeSelector = photoCardLikeSelector;\n    this._photoCardRemoveButtonSelector = photoCardRemoveButtonSelector;\n    this._photoCardNumberLikeSelector = photoCardNumberLikeSelector;\n    this._cardIsLiked = cardIsLiked;\n    this._putLikeCallback = putLikeCallback;\n    this._deleteLikeCallback = deleteLikeCallback;\n  }\n\n  getCardData() {\n    return this._cardData;\n  }\n\n  _setEventListeners() {\n    this._img.addEventListener('click', this._handleCardClick);\n\n    this._buttonLike.addEventListener('click', () => {\n      if (!this._hasLike) {\n        this._putLikeCallback(this).then(res => {\n          this._cardData = res;\n\n          this._buttonLike.classList.add(this._photoCardLikeActiveClass);\n\n          this._numberLikeHtmlElement.textContent = this._cardData.likes.length;\n          this._hasLike = true;\n        }).catch(err => {\n          console.log(err);\n        });\n      } else {\n        this._deleteLikeCallback(this).then(res => {\n          this._cardData = res;\n\n          this._buttonLike.classList.remove(this._photoCardLikeActiveClass);\n\n          this._numberLikeHtmlElement.textContent = this._cardData.likes.length;\n          this._hasLike = false;\n        }).catch(err => {\n          console.log(err);\n        });\n      }\n    });\n\n    this._photoCardRemoveButton.addEventListener('click', () => {\n      this._handleCardRemoveClick(this);\n    });\n  }\n\n  createCardElement() {\n    this._photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);\n    this._photoCard.querySelector(this._photoCardHeadingSelector).textContent = this._cardData.name;\n    this._img = this._photoCard.querySelector(this._photoCardImageSelector);\n\n    this._img.setAttribute('alt', this._cardData.name);\n\n    this._img.setAttribute('src', this._cardData.link);\n\n    this._numberLikeHtmlElement = this._photoCard.querySelector(this._photoCardNumberLikeSelector);\n    this._numberLikeHtmlElement.textContent = this._cardData.likes.length;\n    this._photoCardRemoveButton = this._photoCard.querySelector(this._photoCardRemoveButtonSelector);\n\n    if (!this._canDeleteCardCallback(this)) {\n      this._photoCardRemoveButton.remove();\n    }\n\n    this._buttonLike = this._photoCard.querySelector(this._buttonLikeSelector);\n    this._hasLike = this._cardIsLiked(this);\n\n    if (this._hasLike) {\n      this._buttonLike.classList.add(this._photoCardLikeActiveClass);\n    }\n\n    this._setEventListeners(this._photoCard);\n\n    return this._photoCard;\n  }\n\n  remove() {\n    this._photoCard.remove();\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Card.js?");

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormValidator)\n/* harmony export */ });\nclass FormValidator {\n  constructor(validationSettings, formElement) {\n    this._validationSettings = validationSettings;\n    this._formElement = formElement;\n    this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);\n    this._inputList = this._getInputList();\n  }\n\n  _showInputError(inputElement, errorMessage) {\n    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);\n\n    inputElement.classList.add(this._validationSettings.inputErrorClass);\n    errorElement.textContent = errorMessage;\n    errorElement.classList.add(this._validationSettings.errorVisibleClass);\n  }\n\n  _hideInputError(inputElement) {\n    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);\n\n    inputElement.classList.remove(this._validationSettings.inputErrorClass);\n    errorElement.classList.remove(this._validationSettings.errorVisibleClass);\n    errorElement.textContent = '';\n  }\n\n  _inputIsTouched(inputElement) {\n    return inputElement.classList.contains(this._validationSettings.inputTouchedClass);\n  }\n\n  _setInputTouchedState(inputElement) {\n    if (!this._inputIsTouched(inputElement, this._validationSettings)) {\n      inputElement.classList.add(this._validationSettings.inputTouchedClass);\n    }\n  }\n\n  _clearInputTouchedState(inputElement) {\n    if (this._inputIsTouched(inputElement, this._validationSettings)) {\n      inputElement.classList.remove(this._validationSettings.inputTouchedClass);\n    }\n  }\n\n  _getInputList() {\n    return Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));\n  }\n\n  _clearAllFormInputsTouchedState() {\n    this._inputList.forEach(inputElement => this._clearInputTouchedState(inputElement));\n  }\n\n  _setAllFormInputsTouchedState() {\n    this._inputList.forEach(inputElement => this._setInputTouchedState(inputElement));\n  }\n\n  _updateInputValidity(inputElement) {\n    if (!inputElement.validity.valid && this._inputIsTouched(inputElement)) {\n      this._showInputError(inputElement, inputElement.validationMessage);\n    } else {\n      this._hideInputError(inputElement);\n    }\n  }\n\n  formIsValid() {\n    return this._inputList.every(inputElement => inputElement.validity.valid);\n  }\n\n  _updateButtonState() {\n    if (this.formIsValid()) {\n      this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);\n\n      this._buttonElement.removeAttribute('disabled');\n    } else {\n      this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);\n\n      this._buttonElement.setAttribute('disabled', 'disabled');\n    }\n  }\n\n  _processInputEvent(inputElement) {\n    this._setInputTouchedState(inputElement);\n\n    this._updateInputValidity(inputElement);\n\n    this._updateButtonState();\n  }\n\n  _setEventListeners() {\n    this._inputList.forEach(inputElement => {\n      inputElement.addEventListener('input', () => {\n        this._processInputEvent(inputElement);\n      });\n    });\n  }\n\n  _updateFormValidity() {\n    this._inputList.forEach(inputElement => {\n      this._updateInputValidity(inputElement);\n    });\n\n    this._updateButtonState();\n  }\n\n  prepareFormForUserInput() {\n    this._clearAllFormInputsTouchedState();\n\n    this._updateFormValidity();\n  }\n\n  enableValidation() {\n    this._setEventListeners();\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/FormValidator.js?");

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Popup)\n/* harmony export */ });\nclass Popup {\n  constructor(selector) {\n    this._popup = document.querySelector(selector);\n    this._closePopupButton = this._popup.querySelector('.popup__close-icon');\n    this._handleEscCloseBound = this._handleEscClose.bind(this);\n  }\n\n  open() {\n    this._popup.classList.add('popup_opened');\n\n    document.addEventListener('keydown', this._handleEscCloseBound);\n  }\n\n  close() {\n    this._popup.classList.remove('popup_opened');\n\n    document.removeEventListener('keydown', this._handleEscCloseBound);\n  }\n\n  setEventListeners() {\n    this._closePopupButton.addEventListener('click', () => this.close());\n\n    this._popup.addEventListener('click', evt => {\n      if (evt.target === this._popup) {\n        this.close();\n      }\n    });\n  }\n\n  _handleEscClose(evt) {\n    if (evt.key === 'Escape') {\n      this.close();\n    }\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Popup.js?");

/***/ }),

/***/ "./src/components/PopupWithConfirmation.js":
/*!*************************************************!*\
  !*** ./src/components/PopupWithConfirmation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithConfirmation)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithConfirmation extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    popupSelector,\n    buttonYesSelector\n  }) {\n    super(popupSelector);\n    this._buttonYes = this._popup.querySelector(buttonYesSelector);\n  }\n\n  setButtonYesCallback(buttonYesCallback) {\n    this._buttonYesCallback = buttonYesCallback;\n  }\n\n  setEventListeners() {\n    super.setEventListeners();\n\n    this._buttonYes.addEventListener('click', evt => {\n      this._buttonYesCallback();\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithConfirmation.js?");

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithForm)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(popupSelector, {\n    formSelector,\n    inputSelector,\n    submitButtonSelector,\n    submitButtonTextWhenNotBusy,\n    submitButtonTextWhenBusy\n  }, formSubmitCallback) {\n    super(popupSelector);\n    this._formSubmitCallback = formSubmitCallback;\n    this._form = this._popup.querySelector(formSelector);\n    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));\n    this._submitButton = this._popup.querySelector(submitButtonSelector);\n    this._submitButtonTextWhenNotBusy = submitButtonTextWhenNotBusy;\n    this._submitButtonTextWhenBusy = submitButtonTextWhenBusy;\n    this._isBusy = false;\n  }\n\n  _getInputValues() {\n    const inputValues = {};\n\n    this._inputList.forEach(input => inputValues[input.name] = input.value);\n\n    return inputValues;\n  }\n\n  setEventListeners() {\n    super.setEventListeners();\n\n    this._form.addEventListener('submit', evt => {\n      evt.preventDefault();\n\n      if (!this._isBusy) {\n        this._formSubmitCallback(this._getInputValues());\n      }\n    });\n  }\n\n  close() {\n    super.close();\n\n    this._form.reset();\n  }\n\n  setIsBusy(isBusy = true) {\n    this._isBusy = isBusy;\n    this._submitButton.value = isBusy ? this._submitButtonTextWhenBusy : this._submitButtonTextWhenNotBusy;\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithForm.js?");

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithImage)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    popupSelector,\n    popupImageSelector\n  }) {\n    super(popupSelector);\n    this._image = this._popup.querySelector(popupImageSelector);\n  }\n\n  open({\n    name,\n    link\n  }) {\n    this._image.setAttribute('src', link);\n\n    this._image.setAttribute('alt', name);\n\n    this._image.textContent = name;\n    super.open();\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Section)\n/* harmony export */ });\nclass Section {\n  constructor({\n    data,\n    renderer\n  }, selector) {\n    this._items = data;\n    this._renderer = renderer;\n    this._container = document.querySelector(selector);\n  }\n\n  renderItems() {\n    this._items.forEach(item => this._renderer(item));\n  }\n\n  addItem(domElement, prepend = false) {\n    if (prepend) {\n      this._container.prepend(domElement);\n    } else {\n      this._container.append(domElement);\n    }\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UserInfo)\n/* harmony export */ });\nclass UserInfo {\n  constructor({\n    userNameSelector,\n    userRoleSelector,\n    userAvatarSelector\n  }, user) {\n    this._userNameHtmlElement = document.querySelector(userNameSelector);\n    this._userRoleHtmlElement = document.querySelector(userRoleSelector);\n    this._userAvatarHtmlElement = document.querySelector(userAvatarSelector);\n    this._user = user;\n\n    this._updateElement();\n  }\n\n  getUserInfo() {\n    return this._user;\n  }\n\n  _updateElement() {\n    this._userNameHtmlElement.textContent = this._user.name;\n    this._userRoleHtmlElement.textContent = this._user.about;\n\n    this._userAvatarHtmlElement.setAttribute('src', this._user.avatar);\n\n    this._userAvatarHtmlElement.setAttribute('alt', this._user.name);\n  }\n\n  setUserInfo({\n    userName,\n    userRole\n  }) {\n    this._user.name = userName;\n    this._user.about = userRole;\n\n    this._updateElement();\n  }\n\n  setUserAvatar(avatar) {\n    this._user.avatar = avatar;\n\n    this._updateElement();\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Section.js */ \"./src/components/Section.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Api.js */ \"./src/components/Api.js\");\n/* harmony import */ var _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/PopupWithConfirmation.js */ \"./src/components/PopupWithConfirmation.js\");\n\n\n\n\n\n\n\n\n\nconst photoGridSectionSelector = '.photo-grid';\nconst cardTemplateSelector = '#photo-card-template';\nconst userNameSelector = '.profile__name';\nconst userRoleSelector = '.profile__personal-info';\nconst userAvatarSelector = '.profile__image';\nconst profileEditButton = document.querySelector('.profile__edit-button');\nconst avatarEditButton = document.querySelector('.profile__edit-avatar');\nconst popupFormSelector = '.popup__form';\nconst popupInputSelector = '.popup__input';\nconst popupSubmitButtonSelector = '.popup__button-submit';\nconst profilePopupSelector = '.profile-form-popup';\nconst profileForm = document.querySelector(profilePopupSelector).querySelector(popupFormSelector);\nconst inputAvatar = document.querySelector('#input-avatar');\nconst inputName = document.querySelector('#input-name');\nconst inputPersonalInfo = document.querySelector('#input-personal-info');\nconst addCardButton = document.querySelector('.profile__add-button');\nconst placePopupSelector = '.place-form-popup';\nconst avatarPopupSelector = '.avatar-form-popup';\nconst placeForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);\nconst avatarForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);\nconst popupWithImageSelector = '.image-popup';\nconst popupImageSelector = '.popup__image';\nconst buttonLikeSelector = '.photo-card__like';\nconst photoCardSelector = '.photo-card';\nconst photoCardHeadingSelector = '.photo-card__heading';\nconst photoCardImageSelector = '.photo-card__image';\nconst photoCardLikeActiveClass = 'photo-card__like_active';\nconst photoCardLikeSelector = '.photo-card__like';\nconst photoCardNumberLikeSelector = '.photo-card__number-like';\nconst popupWithConfirmationSelector = '.popup-with-confirmation';\nconst buttonYesSelector = '.popup-button-yes';\nconst photoCardRemoveButtonSelector = '.photo-card__remove';\nlet cardListSection;\nconst validationSettings = {\n  formSelector: popupFormSelector,\n  inputSelector: '.popup__input',\n  inputTouchedClass: 'popup__input_touched',\n  submitButtonSelector: popupSubmitButtonSelector,\n  inactiveButtonClass: 'popup__button-submit_disabled',\n  inputErrorClass: 'popup__input_type_error',\n  errorVisibleClass: 'popup__input-error_active'\n};\nconst popupSettings = {\n  formSelector: popupFormSelector,\n  inputSelector: popupInputSelector,\n  submitButtonSelector: popupSubmitButtonSelector,\n  submitButtonTextWhenNotBusy: 'Сохранить',\n  submitButtonTextWhenBusy: 'Сохранение...'\n};\nconst api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',\n  headers: {\n    authorization: '335a768c-ca5d-40e4-8a41-9424745573a9',\n    'Content-Type': 'application/json'\n  }\n});\nconst profileFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](validationSettings, profileForm);\nprofileFormValidator.enableValidation();\nconst placeFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](validationSettings, placeForm);\nplaceFormValidator.enableValidation();\nconst avatarFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](validationSettings, avatarForm);\navatarFormValidator.enableValidation();\nconst popupWithImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n  popupSelector: popupWithImageSelector,\n  popupImageSelector: popupImageSelector\n});\nconst popupWithConfirmation = new _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n  popupSelector: popupWithConfirmationSelector,\n  buttonYesSelector: buttonYesSelector\n});\npopupWithConfirmation.setEventListeners();\n\nconst createCardElement = cardItem => {\n  const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](cardItem, {\n    cardTemplateSelector: cardTemplateSelector,\n    buttonLikeSelector: buttonLikeSelector,\n    photoCardSelector: photoCardSelector,\n    photoCardHeadingSelector: photoCardHeadingSelector,\n    photoCardImageSelector: photoCardImageSelector,\n    photoCardLikeActiveClass: photoCardLikeActiveClass,\n    photoCardRemoveButtonSelector: photoCardRemoveButtonSelector,\n    photoCardLikeSelector: photoCardLikeSelector,\n    photoCardNumberLikeSelector: photoCardNumberLikeSelector\n  }, () => {\n    popupWithImage.open(cardItem);\n  }, aCard => {\n    popupWithConfirmation.setButtonYesCallback(() => {\n      api.deleteCard(aCard.getCardData()._id).then(() => {\n        popupWithConfirmation.close();\n        aCard.remove();\n      }).catch(err => {\n        console.log(err);\n      });\n    });\n    popupWithConfirmation.open();\n  }, aCard => {\n    const userId = userInfo.getUserInfo()._id;\n\n    const cardOwnerId = aCard.getCardData().owner._id;\n\n    return userId === cardOwnerId;\n  }, aCard => {\n    const userId = userInfo.getUserInfo()._id;\n\n    const cardLikes = aCard.getCardData().likes;\n    let foundLike = false;\n    cardLikes.forEach(cardLike => {\n      if (cardLike._id === userId) {\n        foundLike = true;\n      }\n    });\n    return foundLike;\n  }, aCard => {\n    return api.putLike(aCard.getCardData()._id);\n  }, aCard => {\n    return api.deleteLike(aCard.getCardData()._id);\n  });\n  return card.createCardElement();\n};\n\nlet userInfo;\napi.getProfile().then(res => {\n  userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n    userNameSelector: userNameSelector,\n    userRoleSelector: userRoleSelector,\n    userAvatarSelector: userAvatarSelector\n  }, res);\n  api.getInitialCards().then(res => {\n    cardListSection = new _components_Section_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      data: res,\n      renderer: cardItem => {\n        const cardElement = createCardElement(cardItem);\n        cardListSection.addItem(cardElement);\n      }\n    }, photoGridSectionSelector);\n    cardListSection.renderItems();\n  });\n}).catch(err => {\n  console.log(err);\n});\nconst profilePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](profilePopupSelector, popupSettings, data => {\n  profilePopup.setIsBusy();\n  api.updateProfile(data.userName, data.userRole).then(() => {\n    userInfo.setUserInfo(data);\n    profilePopup.close();\n    profilePopup.setIsBusy(false);\n  }).catch(err => {\n    console.log(err);\n  });\n});\nconst placePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](placePopupSelector, popupSettings, data => {\n  placePopup.setIsBusy();\n  api.addNewCard(data.name, data.link).then(res => {\n    const cardElement = createCardElement(res);\n    cardListSection.addItem(cardElement, true);\n    profilePopup.setIsBusy(false);\n    placePopup.close();\n  }).catch(err => {\n    console.log(err);\n  });\n});\nconst avatarPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](avatarPopupSelector, popupSettings, data => {\n  avatarPopup.setIsBusy();\n  api.updateUserAvatar(data.avatar).then(res => {\n    userInfo.setUserAvatar(res.avatar);\n    avatarPopup.setIsBusy(false);\n    avatarPopup.close();\n  }).catch(err => {\n    console.log(err);\n  });\n});\nprofileEditButton.addEventListener('click', () => {\n  const {\n    name,\n    about\n  } = userInfo.getUserInfo();\n  inputName.value = name;\n  inputPersonalInfo.value = about;\n  profileFormValidator.prepareFormForUserInput();\n  profilePopup.open();\n});\navatarEditButton.addEventListener('click', () => {\n  const {\n    avatar\n  } = userInfo.getUserInfo();\n  inputAvatar.value = avatar;\n  avatarFormValidator.prepareFormForUserInput();\n  avatarPopup.open();\n});\naddCardButton.addEventListener('click', function () {\n  placeForm.reset();\n  placeFormValidator.prepareFormForUserInput();\n  placePopup.open();\n});\n[profilePopup, placePopup, avatarPopup, popupWithImage].forEach(item => item.setEventListeners());\n\n//# sourceURL=webpack://mesto/./src/pages/index.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto/./src/pages/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/index.js");
/******/ 	
/******/ })()
;