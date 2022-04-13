export const BASE_URL = 'https://api.mestor.nomoredomains.work';

function _checkResponse(res) {
    if(res.ok) {
        return res.json()
    }else {
        return Promise.reject(`ОШИБКА: ${res.status}`);
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, credentials: 'include',
        body: JSON.stringify({email, password})
    })
        .then(_checkResponse);
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, credentials: 'include',
        body: JSON.stringify({email, password})
    })
        .then(_checkResponse);
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json', 'Authorization': `${jwt}`
        }, credentials: 'include',
    })
        .then(_checkResponse);
};
