import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import {userContext} from "../contexts/CurrentUserContext.js";

function PopupEditProfile({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(userContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(); // Запрещаем браузеру переходить по адресу формы
        onUpdateUser({ // Передаём значения управляемых компонентов во внешний обработчик
            name, about: description,
        });
    }

    return (<PopupWithForm
        title="Редактировать профиль"
        name="edit"
        buttonTitle="Сохранить"
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
    >
        <fieldset className="popup__form">
            <input
                id="name"
                type="text"
                name="name"
                placeholder="Имя"
                className="popup__text popup__text_type_name"
                required
                minLength="2"
                maxLength="40"
                value={name || ""}
                onChange={handleChangeName}
            />
            <span id="name-error" className="popup__error"/>
            <input
                id="comment"
                type="text"
                name="about"
                placeholder="О себе"
                className="popup__text popup__text_type_comment"
                required
                minLength="2"
                maxLength="200"
                value={description || ""}
                onChange={handleChangeDescription}
            />
            <span id="comment-error" className="popup__error"/>
        </fieldset>
    </PopupWithForm>);
}

export default PopupEditProfile;