function InfoTooltip({isOpen, src, title, onClose}) {

    return (<div className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_place_registration">
            <button onClick={onClose} type="button" aria-label="Close_popup"
                    className="popup__close">
            </button>
            <img className="popup__image" src={src} alt={title}/>
            <h3 className="popup__form-title">{title}</h3>
        </div>
    </div>);
}

export default InfoTooltip;