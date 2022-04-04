import React from "react";
import Card from "./Card.js";
import {userContext} from "../contexts/CurrentUserContext.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardDelete, onCardLike}) {

    const currentUser = React.useContext(userContext);

    return (<main className="content">
        <section className="profile">
            <div className="profile__avatar-container">
                <img src={currentUser.avatar} className="profile__avatar" alt="Аватарка" onClick={onEditAvatar}/>
            </div>
            <div className="profile__content">
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-btn profile__edit-btn_open"
                            aria-label="Ред." onClick={onEditProfile}/>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-btn" aria-label="Добавить" onClick={onAddPlace}/>
            </div>
        </section>
        <section className="elements">
            {cards.map((card) => {
                return (<Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onCardDelete={onCardDelete}
                    onCardLike={onCardLike}
                />);
            })}
        </section>
    </main>);
}

export default Main;