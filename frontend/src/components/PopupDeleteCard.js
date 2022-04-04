import React from "react";
import PopupWithForm from "./PopupWithForm"

function PopupDeleteCard({isOpen, onClose, onDeleteCard}) {

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard();
    }

    return (<PopupWithForm
        title="Вы уверены?"
        name="card-delete"
        buttonTitle="Да"
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}>
    </PopupWithForm>);
}

export default PopupDeleteCard;