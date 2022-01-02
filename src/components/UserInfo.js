export default class UserInfo {
  constructor(
    {userNameSelector, userRoleSelector, userAvatarSelector},
    {initialUserName, initialUserRole, initialUserAvatar}
  ) {
    this._userNameHtmlElement = document.querySelector(userNameSelector);
    this._userRoleHtmlElement = document.querySelector(userRoleSelector);
    this._userAvatarHtmlElement = document.querySelector(userAvatarSelector);
    this._user = {
      name: initialUserName,
      role: initialUserRole,
      avatar: initialUserAvatar
    };
    this._updateElement();
  }

  getUserInfo() {
    return this._user;
  }
  _updateElement() {
    this._userNameHtmlElement.textContent = this._user.name;
    this._userRoleHtmlElement.textContent = this._user.role;
    this._userAvatarHtmlElement.setAttribute('src', this._user.avatar);
    this._userAvatarHtmlElement.setAttribute('alt', this._user.name);
  }

  setUserInfo({userName, userRole, userAvatar}) {
    this._user.name = userName;
    this._user.role = userRole;
    if (userAvatar) {
      this._user.avatar = userAvatar;
    }
    this._updateElement();
  }
}