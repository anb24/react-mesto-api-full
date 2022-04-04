import React from "react";
import PopupWithForm from "./PopupWithForm"

function PopupAddCard({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({name, link});
    }

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    return (<PopupWithForm
        title="Новое место"
        name="card"
        buttonTitle="Создать"
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
    >
        <fieldset className="popup__form">
            <input
                id="popupNamePhoto"
                type="text"
                name="name"
                placeholder="Название"
                className="popup__text popup__text_type_name"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChangeName}
                value={name}
            />
            <span id="popupNamePhoto-error" className="popup__error"/>
            <input
                id="popupLinkPhoto"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_comment"
                required
                onChange={handleChangeLink}
                value={link}
            />
            <span id="popupLinkPhoto-error" className="popup__error"/>
        </fieldset>
    </PopupWithForm>);
}

export default PopupAddCard;