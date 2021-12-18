export default class UserInfo {
  constructor({selectorUserName, selectorUserRole, initialUserName, initialUserRole}) {
    this._userNameHtmlElement = document.querySelector(selectorUserName);
    this._userRoleHtmlElement = document.querySelector(selectorUserRole);
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