import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";


function Register({onRegister}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmail(evt) {
        setEmail(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(email, password);
    }

    return (<section className="sign">
        <h3 className="sign__title">Регистрация</h3>
        <form className="form" onSubmit={handleSubmit}>
            <label className="form__form-field">
                <input
                    type="email"
                    name="email"
                    className="form__input form__input_type_sign"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={email}
                />
            </label>

            <label className="form__form-field">
                <input
                    name="password"
                    type="password"
                    className="form__input form__input_type_sign form__input_type_password"
                    placeholder="Пароль"
                    autoComplete="none"
                    onChange={handlePassword}
                    value={password}
                />
            </label>
            <button
                className="form__submit form__submit_type_sign">Зарегистрироваться
            </button>
        </form>
        <span className="sign__reg-question">
        Уже зарегистрированы?&nbsp;
            <Link to="/sign-in" className="sign__link">Войти</Link>
            </span>
    </section>);
}

export default withRouter(Register);