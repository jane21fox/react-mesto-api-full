class Api {
    
    constructor(config) {
        this._url = config.url;
        // this._headers = config.headers;
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        } 
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            // headers: this._headers
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            // headers: this._headers
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            // headers: this._headers,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._handleResponse)
    }

    editAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            // headers: this._headers,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._handleResponse)
    }

    addCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            // headers: this._headers,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._handleResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            // headers: this._headers
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok) {
                return id;
            } else {
                return Promise.reject();
            }
        })
    }

    toggleLike(method, id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: method,
            // headers: this._headers
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse)
    }
}

const api = new Api({
    // url: 'http://localhost:3000',
    url: 'https://api.mesto-jane21fox.nomoredomains.xyz',
    // headers: {
    //     authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    // }
});

export default api;