class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _response(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
    }

    setAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH', headers: this._headers, body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._response)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(this._response)
    }

    setUser(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH', headers: this._headers, body: JSON.stringify({
                name: data.name, about: data.about
            })
        })
            .then(this._response)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
            .then(this._response)
    }

    setNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST', headers: this._headers, body: JSON.stringify({
                name: data.name, link: data.link
            })
        })
            .then(this._response)
    }

    setCardLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT', headers: this._headers,
        })
            .then(this._response)
    }

    removeCardLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE', headers: this._headers,
        })
            .then(this._response)
    }

    changeCardLike(id, like) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: like ? 'DELETE' : 'PUT', headers: this._headers,
        })
            .then(this._response)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE', headers: this._headers,
        })
            .then(this._response)
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30', headers: {
        authorization: '147d6e49-2abf-4bec-8d5c-2f0bad3d684c', "Content-Type": "application/json",
    }
})

export default api;