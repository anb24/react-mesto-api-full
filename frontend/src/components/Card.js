import React from "react";
import {userContext} from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardDelete, onCardLike}) {
    const currentUser = React.useContext(userContext);
    const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
    const cardDeleteButtonClassName = `element__delete ${isOwn ? "element__delete_active" : ""}`;
    const isLiked = card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const cardLikeButtonClassName = `element__like ${isLiked ? "element__like_active" : ""}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (<div id="card-template">
        <article className="element">
            <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить"
                    onClick={handleDeleteClick}/>
            <img src={`${card.link}`} className="element__image" alt={`${card.name}`} onClick={handleClick}/>
            <div className="element__group">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__box-likes">
                    <button type="button" className={cardLikeButtonClassName} aria-label="Нравится"
                            onClick={handleLikeClick}/>
                    <p className="element__sum-likes">{card.likes.length}</p>
                </div>
            </div>
        </article>
    </div>);
}

export default Card;