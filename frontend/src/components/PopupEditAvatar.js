import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function PopupEditAvatar({isOpen, onClose, onUpdateAvatar}) {
    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
        }, () => {
            inputRef.current.value = "";
        });
    }

    return (<PopupWithForm
        title="Обновить аватар"
        name="edit-avatar"
        buttonTitle="Сохранить"
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
    >
        <fieldset className="popup__form">
            <input
                id="popupLinkPhotoAvatar"
                autoComplete="off"
                type="url"
                name="link"
                placeholder="Ссылка на фото профиля"
                className="popup__text popup__text_type_comment"
                required
                ref={inputRef}
            />
            <span id="popupLinkPhotoAvatar-error" className="popup__error"/>
        </fieldset>
    </PopupWithForm>);
}

export default PopupEditAvatar;