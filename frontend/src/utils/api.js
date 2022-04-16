class Api {
    constructor({url, headers}) {
        this._url = url;
        this._contentType = headers;
    }

    _response(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
    }

    setAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._response)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
        })
            .then(this._response)
    }

    setUser(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._response)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
        })
            .then(this._response)
    }

    setNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._response)
    }

    setCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
        })
            .then(this._response)
    }

    removeCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
        })
            .then(this._response)
    }

    changeCardLike(id, like) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: like ? 'DELETE' : 'PUT', 
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
        })
            .then(this._response)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": this._contentType,
            },
        })
            .then(this._response)
    }
}

const api = new Api({
    url: 'https://api.mestor.nomoredomains.work',
    headers: "application/json",
    // authorization: '147d6e49-2abf-4bec-8d5c-2f0bad3d684c',
})

export default api;