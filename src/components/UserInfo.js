export default class UserInfo {
  constructor(
    {userNameSelector, userRoleSelector, userAvatarSelector},
    user
  ) {
    this._userNameHtmlElement = document.querySelector(userNameSelector);
    this._userRoleHtmlElement = document.querySelector(userRoleSelector);
    this._userAvatarHtmlElement = document.querySelector(userAvatarSelector);
    this._user = user;
    this._updateElement();
  }

  getUserInfo() {
    return this._user;
  }
  _updateElement() {
    this._userNameHtmlElement.textContent = this._user.name;
    this._userRoleHtmlElement.textContent = this._user.about;
    this._userAvatarHtmlElement.setAttribute('src', this._user.avatar);
    this._userAvatarHtmlElement.setAttribute('alt', this._user.name);
  }

  setUserInfo({userName, userRole}) {
    this._user.name = userName;
    this._user.about = userRole;
    this._updateElement();
  }
  setUserAvatar(avatar) {
    this._user.avatar = avatar;
    this._updateElement();
  }
}