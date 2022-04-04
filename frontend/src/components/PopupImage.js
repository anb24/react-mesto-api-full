function PopupImage({card, onClose}) {

    return (<div className={`popup popup_type_img ${card.link ? "popup_opened" : ""}`} id="card-img">
        <div className="popup__container popup__container_type_image">
            <button type="button" className="popup__close" aria-label="Закрыть" onClick={onClose}/>
            <img src={`${card.link}`} className="popup__card-photo" alt={`${card.name}`}/>
            <p className="popup__title-photo">{`${card.name}`}</p>
        </div>
    </div>);
}

export default PopupImage;