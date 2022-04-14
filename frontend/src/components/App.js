import React from "react";
import {useState, useEffect} from "react";
import {Switch, Route, Redirect, withRouter, useHistory} from 'react-router-dom';
import api from "../utils/api";
import * as auth from "../utils/auth";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupImage from "./PopupImage";
import PopupAddCard from "./PopupAddCard";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupEditProfile from "./PopupEditProfile";
import PopupDeleteCard from "./PopupDeleteCard";
import {userContext} from "../contexts/CurrentUserContext.js";
import {Spinner} from "./Spinner.js"

import loadingImage from '../images/avatar-loader.gif';
import regFailedImg from "../images/reg_failed.svg";
import regConfirmImg from "../images/reg_confirm.svg";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({email: null});
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({
        name: 'Загрузка...', about: 'Загрузка...', avatar: loadingImage,
    });
    const [cards, setCards] = useState([]);
    const [cardId, setCardId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [infoTolltip, setInfoTooltip] = useState({
        isOpen: false, src: '', title: '',
    });


    useEffect(() => {
        tokenCheck();
        api.getUserInfo()
            .then(data => setCurrentUser(data))
            .catch(err => console.log('###Ошибка: данные пользователя ', err));
    }, []);
    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getCards()])
                .then(([currentUserData, card]) => {
                    setCurrentUser(currentUserData);
                    if (card) {
                        setCards(card.reverse());
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }, [isLoggedIn]);
    useEffect(() => {
        setIsLoading(true);
        api
            .getCards()
            .then((cards) => {
                setCards(cards);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleTooltip(isOpen, src, title) {
        setInfoTooltip({
            isOpen, src, title
        })
    }

    function handleLoginStatus() {
        setIsLoggedIn(!isLoggedIn);
        console.log('Статус входа изменен: ', isLoggedIn)
    }


    function handleMenuOpen() {
        console.log('click', isMenuOpen)
        setIsMenuOpen(!isMenuOpen);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddCardClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleDeleteCardClick(card) {
        setDeletePopupOpen(true);
        setCardId(card._id);
    }

    //закрытие попапов
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({});
        setDeletePopupOpen(false);
        setInfoTooltip(false);
    }

    function tokenCheck() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (token) {
                auth.getContent(token).then((res) => {
                    if (res) {
                        setIsLoggedIn(true);
                        console.log(res.data.email);
                        setUserData({email: res.data.email});
                        history.push('/');
                    }
                })
                    .catch(err => {
                        history.push('/sign-in');
                        console.log(err)
                    });
            }
        }
    }

    function handleAuthorization(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                localStorage.setItem('token', data.token);
            })
            .then(() => {
                handleLoginStatus();
                setUserData({email: email});
                history.push('/');
            })
            .catch((err) => {
                handleTooltip(true, regFailedImg, "Что-то пошло не так! Попробуйте ещё раз.")
                console.log(err);
            })
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then(res => {
                if (res) {
                    handleTooltip(true, regConfirmImg, "Вы успешно зарегистрировались!");
                    setTimeout(() => {
                        closeAllPopups();
                        history.push('/sign-in');
                    }, 2000);
                    console.log('Успешно!');
                } else {
                    console.log('Не удалось!');
                }
            })
            .catch(err => {
                handleTooltip(true, regFailedImg, "Что-то пошло не так! Попробуйте ещё раз.")
                console.log(err)
            });
    }

    function signOut() {
        localStorage.removeItem('token');
        handleLoginStatus();
        setIsMenuOpen(false);
    }

    function handleUpdateUser(data) {
        api
            .setUser(data)
            .then((currentUserData) => {
                setCurrentUser(currentUserData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(data) {
        api
            .setAvatar(data)
            .then((currentUserData) => {
                setCurrentUser(currentUserData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        api
            .setNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
            .changeCardLike(card._id, isLiked)
            .then((newCardSomeLike) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCardSomeLike : c)));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api
            .deleteCard(cardId)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== cardId));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return isLoading ? (<Spinner/>) : (<userContext.Provider value={currentUser}>
        <div className="page">
            <div className="page__container">
                <Header
                    isLoggedIn={isLoggedIn}
                    signOut={signOut}
                    userData={userData}
                    onClose={closeAllPopups}
                    isMenuOpen={isMenuOpen}
                    handleMenuOpen={handleMenuOpen}
                />
                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        isLoggedIn={isLoggedIn}
                        component={Main}
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddCardClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCardClick}
                    />
                    <Route path="/sign-in">
                        <Login
                            name="login"
                            handleLoginStatus={handleLoginStatus}
                            handleTooltip={handleTooltip}
                            handleUserData={setUserData}
                            infoTolltip={infoTolltip}
                            onClose={closeAllPopups}
                            onLogin={handleAuthorization}
                        />
                    </Route>
                    <Route path="/sign-up">
                        <Register
                            name="register"
                            handleTooltip={handleTooltip}
                            infoTolltip={infoTolltip}
                            onClose={closeAllPopups}
                            onRegister={handleRegister}
                        />
                    </Route>
                    <Route>
                        {isLoggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                    </Route>
                </Switch>
                <Footer/>
                <PopupEditProfile
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <PopupAddCard
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <PopupEditAvatar
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <PopupImage
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <PopupDeleteCard
                    isOpen={isDeletePopupOpen}
                    onClose={closeAllPopups}
                    onDeleteCard={handleCardDelete}
                />
                <InfoTooltip
                    {...infoTolltip}
                    onClose={closeAllPopups}
                />
            </div>
        </div>
    </userContext.Provider>);
}

export default withRouter(App);
