export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getProfile() {
    return fetch(
      this.baseUrl + '/users/me',
      {
        headers: this.headers
      }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  updateProfile(userName, userRole) {
    return fetch(
      this.baseUrl + '/users/me',
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: userName,
          about: userRole
        })
      }
    );
  }

  addNewCard(cardName, cardLink) {
    return fetch(
      this.baseUrl + '/cards',
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      }
    );
  }
}


