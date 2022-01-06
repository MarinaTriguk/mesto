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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Api)\n/* harmony export */ });\nclass Api {\n  constructor({\n    baseUrl,\n    headers\n  }) {\n    this.baseUrl = baseUrl;\n    this.headers = headers;\n  }\n\n  _request(address, method = 'GET', body = null) {\n    return fetch(this.baseUrl + address, {\n      method: method,\n      headers: this.headers,\n      body: body !== null ? JSON.stringify(body) : undefined\n    }).then(res => {\n      if (res.ok) {\n        return res.json();\n      }\n\n      return Promise.reject(`Ошибка: ${res.status}`);\n    });\n  }\n\n  getProfile() {\n    return this._request('/users/me');\n  }\n\n  getInitialCards() {\n    return this._request('/cards');\n  }\n\n  updateProfile(name, about) {\n    return this._request('/users/me', 'PATCH', {\n      name: name,\n      about: about\n    });\n  }\n\n  addNewCard(cardName, cardLink) {\n    return this._request('/cards', 'POST', {\n      name: cardName,\n      link: cardLink\n    });\n  }\n\n  deleteCard(cardId) {\n    return this._request('/cards/' + cardId, 'DELETE');\n  }\n\n  putLike(cardId) {\n    return this._request('/cards/' + cardId + '/likes', 'PUT');\n  }\n\n  deleteLike(cardId) {\n    return this._request('/cards/' + cardId + '/likes', 'DELETE');\n  }\n\n  updateUserAvatar(avatar) {\n    return this._request('/users/me/avatar', 'PATCH', {\n      avatar: avatar\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\n  constructor(cardData, userId, {\n    cardTemplateSelector,\n    buttonLikeSelector,\n    photoCardSelector,\n    photoCardHeadingSelector,\n    photoCardImageSelector,\n    photoCardLikeActiveClass,\n    photoCardRemoveButtonSelector,\n    photoCardNumberLikeSelector\n  }, handleCardClick, handleCardRemoveClick, handleCardLikeClick) {\n    this._cardData = cardData;\n    this._userId = userId;\n    this._cardTemplateSelector = cardTemplateSelector;\n    this._buttonLikeSelector = buttonLikeSelector;\n    this._photoCardSelector = photoCardSelector;\n    this._photoCardHeadingSelector = photoCardHeadingSelector;\n    this._photoCardImageSelector = photoCardImageSelector;\n    this._photoCardLikeActiveClass = photoCardLikeActiveClass;\n    this._handleCardClick = handleCardClick;\n    this._handleCardRemoveClick = handleCardRemoveClick;\n    this._photoCardRemoveButtonSelector = photoCardRemoveButtonSelector;\n    this._photoCardNumberLikeSelector = photoCardNumberLikeSelector;\n    this._handleCardLikeClick = handleCardLikeClick;\n    this._hasLike = this._isLikedByCurrentUser();\n  }\n\n  _isLikedByCurrentUser() {\n    return this._cardData.likes.some(cardLike => cardLike._id === this._userId);\n  }\n\n  getCardData() {\n    return this._cardData;\n  }\n\n  setHasLike(value) {\n    this._hasLike = value;\n  }\n\n  setCardLikes(likes) {\n    this._cardData.likes = likes;\n  }\n\n  updateCardLikes() {\n    this._numberLikeHtmlElement.textContent = this._cardData.likes.length;\n\n    if (this._hasLike) {\n      this._buttonLike.classList.add(this._photoCardLikeActiveClass);\n    } else {\n      this._buttonLike.classList.remove(this._photoCardLikeActiveClass);\n    }\n  }\n\n  _setEventListeners() {\n    this._img.addEventListener('click', this._handleCardClick);\n\n    this._buttonLike.addEventListener('click', () => this._handleCardLikeClick(this));\n\n    this._photoCardRemoveButton.addEventListener('click', () => this._handleCardRemoveClick(this));\n  }\n\n  _canDeleteCard() {\n    return this._userId === this._cardData.owner._id;\n  }\n\n  hasLike() {\n    return this._hasLike;\n  }\n\n  createCardElement() {\n    this._photoCard = document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);\n    this._photoCard.querySelector(this._photoCardHeadingSelector).textContent = this._cardData.name;\n    this._img = this._photoCard.querySelector(this._photoCardImageSelector);\n    this._img.alt = this._cardData.name;\n    this._img.src = this._cardData.link;\n    this._numberLikeHtmlElement = this._photoCard.querySelector(this._photoCardNumberLikeSelector);\n    this._numberLikeHtmlElement.textContent = this._cardData.likes.length;\n    this._photoCardRemoveButton = this._photoCard.querySelector(this._photoCardRemoveButtonSelector);\n\n    if (!this._canDeleteCard()) {\n      this._photoCardRemoveButton.remove();\n    }\n\n    this._buttonLike = this._photoCard.querySelector(this._buttonLikeSelector);\n\n    if (this._hasLike) {\n      this._buttonLike.classList.add(this._photoCardLikeActiveClass);\n    }\n\n    this._setEventListeners(this._photoCard);\n\n    return this._photoCard;\n  }\n\n  remove() {\n    this._photoCard.remove();\n\n    this._photoCard = null;\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Card.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithImage)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    popupSelector,\n    popupImageSelector\n  }) {\n    super(popupSelector);\n    this._image = this._popup.querySelector(popupImageSelector);\n  }\n\n  open({\n    name,\n    link\n  }) {\n    this._image.src = link;\n    this._image.alt = name;\n    this._image.textContent = name;\n    super.open();\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Section)\n/* harmony export */ });\nclass Section {\n  constructor({\n    data,\n    renderer\n  }, selector) {\n    this._items = data;\n    this._renderer = renderer;\n    this._container = document.querySelector(selector);\n  }\n\n  setItems(items) {\n    this._items = items;\n  }\n\n  renderItems() {\n    this._items.forEach(item => this._renderer(item));\n  }\n\n  addItem(domElement, prepend = false) {\n    if (prepend) {\n      this._container.prepend(domElement);\n    } else {\n      this._container.append(domElement);\n    }\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UserInfo)\n/* harmony export */ });\nclass UserInfo {\n  constructor({\n    userNameSelector,\n    userRoleSelector,\n    userAvatarSelector\n  }, user) {\n    this._userNameHtmlElement = document.querySelector(userNameSelector);\n    this._userRoleHtmlElement = document.querySelector(userRoleSelector);\n    this._userAvatarHtmlElement = document.querySelector(userAvatarSelector);\n    this._user = user;\n\n    this._updateElement();\n  }\n\n  getUserInfo() {\n    return this._user;\n  }\n\n  _updateElement() {\n    this._userNameHtmlElement.textContent = this._user.name;\n    this._userRoleHtmlElement.textContent = this._user.about;\n    this._userAvatarHtmlElement.src = this._user.avatar;\n    this._userAvatarHtmlElement.alt = this._user.name;\n  }\n\n  setUserInfo({\n    name,\n    about\n  }) {\n    this._user.name = name;\n    this._user.about = about;\n\n    this._updateElement();\n  }\n\n  setUserAvatar(avatar) {\n    this._user.avatar = avatar;\n\n    this._updateElement();\n  }\n\n}\n\n//# sourceURL=webpack://mesto/./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Section.js */ \"./src/components/Section.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Api.js */ \"./src/components/Api.js\");\n/* harmony import */ var _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/PopupWithConfirmation.js */ \"./src/components/PopupWithConfirmation.js\");\n/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/constants.js */ \"./src/utils/constants.js\");\n\n\n\n\n\n\n\n\n\n\nlet userId = null;\nconst api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',\n  headers: {\n    authorization: '335a768c-ca5d-40e4-8a41-9424745573a9',\n    'Content-Type': 'application/json'\n  }\n});\nconst profileFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.validationSettings, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.profileForm);\nprofileFormValidator.enableValidation();\nconst placeFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.validationSettings, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.placeForm);\nplaceFormValidator.enableValidation();\nconst avatarFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.validationSettings, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.avatarForm);\navatarFormValidator.enableValidation();\nconst popupWithImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n  popupSelector: _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupWithImageSelector,\n  popupImageSelector: _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupImageSelector\n});\nconst popupWithConfirmation = new _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n  popupSelector: _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupWithConfirmationSelector,\n  buttonYesSelector: _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.buttonYesSelector\n});\nconst userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.userProfileSettings, {\n  name: '',\n  about: '',\n  avatar: _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.solidColorImage\n});\nconst cardListSection = new _components_Section_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  data: [],\n  renderer: cardItem => {\n    const cardElement = createCardElement(cardItem);\n    cardListSection.addItem(cardElement);\n  }\n}, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.photoGridSectionSelector);\npopupWithConfirmation.setEventListeners();\n\nconst createCardElement = cardItem => {\n  const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](cardItem, userId, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.cardConfig, () => {\n    popupWithImage.open(cardItem);\n  }, aCard => {\n    popupWithConfirmation.setButtonYesCallback(() => {\n      api.deleteCard(aCard.getCardData()._id).then(() => {\n        popupWithConfirmation.close();\n        aCard.remove();\n      }).catch(err => {\n        console.log(err);\n      });\n    });\n    popupWithConfirmation.open();\n  }, aCard => {\n    if (!aCard.hasLike()) {\n      api.putLike(aCard.getCardData()._id).then(res => {\n        aCard.setCardLikes(res.likes);\n        aCard.setHasLike(true);\n        aCard.updateCardLikes();\n      }).catch(err => {\n        console.log(err);\n      });\n    } else {\n      api.deleteLike(aCard.getCardData()._id).then(res => {\n        aCard.setCardLikes(res.likes);\n        aCard.setHasLike(false);\n        aCard.updateCardLikes();\n      }).catch(err => {\n        console.log(err);\n      });\n    }\n  });\n  return card.createCardElement();\n};\n\nPromise.all([api.getProfile(), api.getInitialCards()]).then(([profile, initialCards]) => {\n  userInfo.setUserInfo(profile);\n  userInfo.setUserAvatar(profile.avatar);\n  userId = profile._id;\n  cardListSection.setItems(initialCards);\n  cardListSection.renderItems();\n}).catch(err => {\n  console.log(err);\n});\nconst profilePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.profilePopupSelector, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupSettings, data => {\n  profilePopup.setIsBusy();\n  api.updateProfile(data.name, data.about).then(() => {\n    userInfo.setUserInfo(data);\n    profilePopup.close();\n  }).catch(err => {\n    console.log(err);\n  }).finally(() => profilePopup.setIsBusy(false));\n});\nconst placePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.placePopupSelector, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupSettings, data => {\n  placePopup.setIsBusy();\n  api.addNewCard(data.name, data.link).then(res => {\n    const cardElement = createCardElement(res);\n    cardListSection.addItem(cardElement, true);\n    placePopup.close();\n  }).catch(err => {\n    console.log(err);\n  }).finally(() => placePopup.setIsBusy(false));\n});\nconst avatarPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.avatarPopupSelector, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupSettings, data => {\n  avatarPopup.setIsBusy();\n  api.updateUserAvatar(data.avatar).then(res => {\n    userInfo.setUserAvatar(res.avatar);\n    avatarPopup.setIsBusy(false);\n    avatarPopup.close();\n  }).catch(err => {\n    console.log(err);\n  }).finally(() => avatarPopup.setIsBusy(false));\n});\n_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.profileEditButton.addEventListener('click', () => {\n  const {\n    name,\n    about\n  } = userInfo.getUserInfo();\n  _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.inputName.value = name;\n  _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.inputPersonalInfo.value = about;\n  profileFormValidator.prepareFormForUserInput();\n  profilePopup.open();\n});\n_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.avatarEditButton.addEventListener('click', () => {\n  avatarFormValidator.prepareFormForUserInput();\n  avatarPopup.open();\n});\n_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.addCardButton.addEventListener('click', function () {\n  _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.placeForm.reset();\n  placeFormValidator.prepareFormForUserInput();\n  placePopup.open();\n});\n[profilePopup, placePopup, avatarPopup, popupWithImage].forEach(item => item.setEventListeners());\n\n//# sourceURL=webpack://mesto/./src/pages/index.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"photoGridSectionSelector\": () => (/* binding */ photoGridSectionSelector),\n/* harmony export */   \"cardTemplateSelector\": () => (/* binding */ cardTemplateSelector),\n/* harmony export */   \"userNameSelector\": () => (/* binding */ userNameSelector),\n/* harmony export */   \"userRoleSelector\": () => (/* binding */ userRoleSelector),\n/* harmony export */   \"userAvatarSelector\": () => (/* binding */ userAvatarSelector),\n/* harmony export */   \"profileEditButton\": () => (/* binding */ profileEditButton),\n/* harmony export */   \"avatarEditButton\": () => (/* binding */ avatarEditButton),\n/* harmony export */   \"popupFormSelector\": () => (/* binding */ popupFormSelector),\n/* harmony export */   \"popupInputSelector\": () => (/* binding */ popupInputSelector),\n/* harmony export */   \"popupSubmitButtonSelector\": () => (/* binding */ popupSubmitButtonSelector),\n/* harmony export */   \"profilePopupSelector\": () => (/* binding */ profilePopupSelector),\n/* harmony export */   \"profileForm\": () => (/* binding */ profileForm),\n/* harmony export */   \"inputAvatar\": () => (/* binding */ inputAvatar),\n/* harmony export */   \"inputName\": () => (/* binding */ inputName),\n/* harmony export */   \"inputPersonalInfo\": () => (/* binding */ inputPersonalInfo),\n/* harmony export */   \"addCardButton\": () => (/* binding */ addCardButton),\n/* harmony export */   \"placePopupSelector\": () => (/* binding */ placePopupSelector),\n/* harmony export */   \"avatarPopupSelector\": () => (/* binding */ avatarPopupSelector),\n/* harmony export */   \"placeForm\": () => (/* binding */ placeForm),\n/* harmony export */   \"avatarForm\": () => (/* binding */ avatarForm),\n/* harmony export */   \"popupWithImageSelector\": () => (/* binding */ popupWithImageSelector),\n/* harmony export */   \"popupImageSelector\": () => (/* binding */ popupImageSelector),\n/* harmony export */   \"buttonLikeSelector\": () => (/* binding */ buttonLikeSelector),\n/* harmony export */   \"photoCardSelector\": () => (/* binding */ photoCardSelector),\n/* harmony export */   \"photoCardHeadingSelector\": () => (/* binding */ photoCardHeadingSelector),\n/* harmony export */   \"photoCardImageSelector\": () => (/* binding */ photoCardImageSelector),\n/* harmony export */   \"photoCardLikeActiveClass\": () => (/* binding */ photoCardLikeActiveClass),\n/* harmony export */   \"photoCardNumberLikeSelector\": () => (/* binding */ photoCardNumberLikeSelector),\n/* harmony export */   \"popupWithConfirmationSelector\": () => (/* binding */ popupWithConfirmationSelector),\n/* harmony export */   \"buttonYesSelector\": () => (/* binding */ buttonYesSelector),\n/* harmony export */   \"photoCardRemoveButtonSelector\": () => (/* binding */ photoCardRemoveButtonSelector),\n/* harmony export */   \"validationSettings\": () => (/* binding */ validationSettings),\n/* harmony export */   \"popupSettings\": () => (/* binding */ popupSettings),\n/* harmony export */   \"userProfileSettings\": () => (/* binding */ userProfileSettings),\n/* harmony export */   \"cardConfig\": () => (/* binding */ cardConfig),\n/* harmony export */   \"solidColorImage\": () => (/* binding */ solidColorImage)\n/* harmony export */ });\nconst photoGridSectionSelector = '.photo-grid';\nconst cardTemplateSelector = '#photo-card-template';\nconst userNameSelector = '.profile__name';\nconst userRoleSelector = '.profile__personal-info';\nconst userAvatarSelector = '.profile__image';\nconst profileEditButton = document.querySelector('.profile__edit-button');\nconst avatarEditButton = document.querySelector('.profile__edit-avatar');\nconst popupFormSelector = '.popup__form';\nconst popupInputSelector = '.popup__input';\nconst popupSubmitButtonSelector = '.popup__button-submit';\nconst profilePopupSelector = '.profile-form-popup';\nconst profileForm = document.querySelector(profilePopupSelector).querySelector(popupFormSelector);\nconst inputAvatar = document.querySelector('#input-avatar');\nconst inputName = document.querySelector('#input-name');\nconst inputPersonalInfo = document.querySelector('#input-personal-info');\nconst addCardButton = document.querySelector('.profile__add-button');\nconst placePopupSelector = '.place-form-popup';\nconst avatarPopupSelector = '.avatar-form-popup';\nconst placeForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);\nconst avatarForm = document.querySelector(placePopupSelector).querySelector(popupFormSelector);\nconst popupWithImageSelector = '.image-popup';\nconst popupImageSelector = '.popup__image';\nconst buttonLikeSelector = '.photo-card__like';\nconst photoCardSelector = '.photo-card';\nconst photoCardHeadingSelector = '.photo-card__heading';\nconst photoCardImageSelector = '.photo-card__image';\nconst photoCardLikeActiveClass = 'photo-card__like_active';\nconst photoCardNumberLikeSelector = '.photo-card__number-like';\nconst popupWithConfirmationSelector = '.popup-with-confirmation';\nconst buttonYesSelector = '.popup-button-yes';\nconst photoCardRemoveButtonSelector = '.photo-card__remove';\nconst validationSettings = {\n  formSelector: popupFormSelector,\n  inputSelector: '.popup__input',\n  inputTouchedClass: 'popup__input_touched',\n  submitButtonSelector: popupSubmitButtonSelector,\n  inactiveButtonClass: 'popup__button-submit_disabled',\n  inputErrorClass: 'popup__input_type_error',\n  errorVisibleClass: 'popup__input-error_active'\n};\nconst popupSettings = {\n  formSelector: popupFormSelector,\n  inputSelector: popupInputSelector,\n  submitButtonSelector: popupSubmitButtonSelector,\n  submitButtonTextWhenNotBusy: 'Сохранить',\n  submitButtonTextWhenBusy: 'Сохранение...'\n};\nconst userProfileSettings = {\n  userNameSelector: userNameSelector,\n  userRoleSelector: userRoleSelector,\n  userAvatarSelector: userAvatarSelector\n};\nconst cardConfig = {\n  cardTemplateSelector: cardTemplateSelector,\n  buttonLikeSelector: buttonLikeSelector,\n  photoCardSelector: photoCardSelector,\n  photoCardHeadingSelector: photoCardHeadingSelector,\n  photoCardImageSelector: photoCardImageSelector,\n  photoCardLikeActiveClass: photoCardLikeActiveClass,\n  photoCardRemoveButtonSelector: photoCardRemoveButtonSelector,\n  photoCardNumberLikeSelector: photoCardNumberLikeSelector\n};\nconst solidColorImage = new URL(/* asset import */ __webpack_require__(/*! ../images/solid-color-image.png */ \"./src/images/solid-color-image.png\"), __webpack_require__.b);\n\n//# sourceURL=webpack://mesto/./src/utils/constants.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto/./src/pages/index.css?");

/***/ }),

/***/ "./src/images/solid-color-image.png":
/*!******************************************!*\
  !*** ./src/images/solid-color-image.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"4b9dd7a3a51aba87a810.png\";\n\n//# sourceURL=webpack://mesto/./src/images/solid-color-image.png?");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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