export const BASE_URL = 'https://auth.nomoreparties.co';

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
        }, body: JSON.stringify({email, password})
    })
        .then(_checkResponse);
        // .then(res => res.ok ? res.json() : Promise.reject(`ОШИБКА: ${res.status}`))
        // .then(res => {
        //     if (res.status === 400) {
        //         throw new Error('Некорректно заполнено одно из полей');
        //     } else if (res.status === 200) {
        //         return res.json();
        //     }
        //     throw new Error('Ошибка сервера');
        // })
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify({email, password})
    })
        .then(_checkResponse);
        // .then(res => res.ok ? res.json() : Promise.reject(`ОШИБКА: ${res.statusText}`))
        // .then(res => {
        //     if (res.status === 200) {
        //         return;
        //     }
        //     if (res.status === 400) {
        //         throw new Error('Не передано одно из полей');
        //     }
        //     if (res.status === 401) {
        //         throw new Error('Пользователь с email не найден');
        //     }
        //     throw new Error(`Ошибка авторизации: ${res.status}`);
        // })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
        },
    })
        .then(_checkResponse);
        // .then(res => res.ok ? res.json() : Promise.reject(`ОШИБКА: ${res.statusText}`))
        // .then((res) => {
        //     if (res.status === 200) {
        //         return res.json();
        //     }
        //     if (res.status === 400) {
        //         throw new Error('Токен не передан или передан не в том формате');
        //     }
        //     if (res.status === 401) {
        //         throw new Error('Переданный токен некорректен');
        //     }
        //     throw new Error(`Ошибка токена: ${res.status}`);
        // })
};
