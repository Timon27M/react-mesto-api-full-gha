class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  getProfileInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  setUserInfo(userObj) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userObj.name,
        about: userObj.about,
      }),
    }).then(this._checkStatus);
  }

  setUserAvatar(avatarObj) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarObj.avatar,
      }),
    }).then(this._checkStatus);
  }

  addCard(cardObj) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardObj.name,
        link: cardObj.link,
      }),
    }).then(this._checkStatus);
  }

  deleteCardApi(id) {
    return fetch(this._baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  likeCard(id) {
    return fetch(this._baseUrl + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  disLikeCard(id) {
    return fetch(this._baseUrl + "/cards/" + id + "/likes", {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkStatus);
  }
}

const api = new Api({
  baseUrl: "https://api.tim27.nomoreparties.sbs",
  headers: {
    Authorization: `${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});

export default api;