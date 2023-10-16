
class Api {
   constructor( {url, headers} ) {
      this._url = url;
      this._headers = headers;
   }

   _getResponseData(response) {
      if(response.ok) {
         return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
   }

   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: this._headers,
      }).then((response) => this._getResponseData(response));
   }

   getUserData() {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers,
      }).then((response) => this._getResponseData(response));
   }

   setUserData(data) {
      return fetch(`${this._url}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
         name: data.name,
         about: data.about
         })
      }).then((response) => this._getResponseData(response));
   }

   createNewCard(data) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
         name: data.name,
         link: data.link
         })
      }).then((response) => this._getResponseData(response));
   }

   updateAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
         avatar: data.link
         })
      }).then((response) => this._getResponseData(response));
   }

   deleteCard(cardID) {
      return fetch(`${this._url}/cards/${cardID}`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then((response) => this._getResponseData(response));
   }

   setLike(cardID) {
      return fetch(`${this._url}/cards/${cardID}/likes`, {
         method: 'PUT',
         headers: this._headers
      })
         .then((response) => this._getResponseData(response));
   }

   deleteLike(cardID) {
      return fetch(`${this._url}/cards/${cardID}/likes`, {
         method:'DELETE',
         headers: this._headers
      })
         .then((response) => this._getResponseData(response));
   }
}

//создаём экземпляр класса Api
const api = new Api({
   url: "https://mesto.nomoreparties.co/v1/cohort-74",
   headers: {
      authorization: 'dff3a039-c715-4449-a69c-ffa6fb6a81fb',
      'Content-Type': 'application/json',
   }
})

export default api;