export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  _request(address, method = 'GET', body = null) {
    return fetch(
      this.baseUrl + address,
      {
        method: method,
        headers: this.headers,
        body: body !== null ? JSON.stringify(body) : undefined
      }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  getProfile() {
    return this._request('/users/me');
  }

  getInitialCards() {
    return this._request('/cards');
  }

  updateProfile(userName, userRole) {
    return this._request(
      '/users/me',
      'PATCH',
      {
        name: userName,
        about: userRole
      }
    );

  }

  addNewCard(cardName, cardLink) {
    return this._request(
      '/cards',
      'POST',
      {
        name: cardName,
        link: cardLink
      }
    );
  }

  deleteCard(cardId) {
    return this._request(
      '/cards/' + cardId,
      'DELETE'
    );
  }

  putLike(cardId) {
    return this._request(
      '/cards/' + cardId + '/likes',
      'PUT'
    );
  }

  deleteLike(cardId) {
    return this._request(
      '/cards/' + cardId + '/likes',
      'DELETE'
    );
  }

  updateUserAvatar(avatar) {
    return this._request(
      '/users/me/avatar',
      'PATCH',
      {avatar: avatar}
    )
  }
}


