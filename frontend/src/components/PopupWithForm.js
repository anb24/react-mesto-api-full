import React from 'react';

function PopupWithForm({name, title, children, isOpen, onClose, buttonTitle, onSubmit}) {

    return (<div
        className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
        <div className="popup__container">
            <button
                type="button"
                className="popup__close"
                aria-label="Закрыть"
                onClick={onClose}
            />
            <h2 className="popup__title">{title}</h2>
            <form
                className="popup__form"
                name={`${name}__form`}
                onSubmit={onSubmit}
            >
                {children}
                <button
                    className="popup__save-btn"
                    type="submit"
                    aria-label="Сохранить"
                >
                    {buttonTitle}
                </button>
            </form>
        </div>
    </div>);
}

export default PopupWithForm;