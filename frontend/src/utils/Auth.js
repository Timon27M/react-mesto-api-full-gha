class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(email, password) {
    return fetch(this._baseUrl + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._checkStatus);
  }

  login(email, password) {
    return fetch(this._baseUrl + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._checkStatus);
  }

  getUserInfo(jwt) {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkStatus);
  }
}

const auth = new Auth("https://api.tim27.nomoreparties.sbs");

export default auth;
