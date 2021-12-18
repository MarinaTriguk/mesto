export default class UserInfo {
  constructor({userNameSelector, userRoleSelector, initialUserName, initialUserRole}) {
    this._userNameHtmlElement = document.querySelector(userNameSelector);
    this._userRoleHtmlElement = document.querySelector(userRoleSelector);
    this._user = {name : initialUserName, role : initialUserRole };
    this._updateElement();
  }

  getUserInfo() {
    return this._user;
  }
  _updateElement() {
    this._userNameHtmlElement.textContent = this._user.name;
    this._userRoleHtmlElement.textContent = this._user.role;
  }

  setUserInfo({userName, userRole}) {
    this._user.name = userName;
    this._user.role = userRole;
    this._updateElement();
  }
}