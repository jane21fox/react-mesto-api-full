import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as authApi from '../utils/authApi.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          auth(token);
        }
    }, [loggedIn]);

    useEffect(() => {
        if(loggedIn) {
            Promise.all([api.getUserInfo(), api.getCards()])
            .then(([ userData, cards ]) => { 
                setCurrentUser(userData);
                setUserData({
                    _id: userData._id,
                    email: userData.email
                });
                setCards(cards);
            })
            .catch(() => {
                console.log('Ошибка при инициализации приложения');
            });
        }
    }, [loggedIn]);

    useEffect(() => {
        const closeByEscape = (e) => {
          if (e.key === 'Escape') {
            closeAllPopups();
          }
        }
  
        document.addEventListener('keydown', closeByEscape)
        
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    const auth = async (token) => {
        return authApi.checkToken(token)
        .then((res) => {
            if (res) {
                setLoggedIn(true);
                // setUserData({
                //     _id: res.data._id,
                //     email: res.data.email
                // });
            }
        })
        .catch(() => {
            localStorage.removeItem('token');
            onStatus(false);
        });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.toggleLike(isLiked ? 'DELETE' : 'PUT', card._id)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(() => {
            console.log('Ошибка при изменении параметров карточки');
        });
    } 

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch(() => {
            console.log('Ошибка при удалении карточки');
        });
    } 

    function handleUpdateUser(user) {
        api.setUserInfo(user)
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(() => {
            console.log('Ошибка при обновлении информации о пользователе');
        });
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar)
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(() => {
            console.log('Ошибка при обновлении аватара пользователя');
        });
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(() => {
            console.log('Ошибка при добавлении карточки');
        });
    }
    
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard(null);
    }

    const onStatus = (status) => {
        setIsRegisterSuccess(status);
        setIsInfoTooltipOpen(true);
    }

    const onRegister = async ({ password, email }) => {
        return authApi.register(password, email)
        .then((res) => {
            return res;
        });
    }
    
    const onLogin = async ({ password, email }) => {
        return authApi.authorize(password, email)
        .then((res) => {
            if (res.token) {
                setLoggedIn(true);
                localStorage.setItem('token', res.token);
            }
        });
    }
    
    const onSignOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserData({});
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="container">
            <Router>
                <Header loggedIn={loggedIn} onSignOut={onSignOut} userData={userData}/>
                <Switch>
                    <ProtectedRoute
                        path="/main"
                        loggedIn={loggedIn}
                        component={Main}
                        cards={cards} 
                        onEditProfile={handleEditProfileClick} 
                        onAddPlace={handleAddPlaceClick} 
                        onEditAvatar={handleEditAvatarClick} 
                        onCardClick={setSelectedCard} 
                        onCardLike={handleCardLike} 
                        onCardDelete={handleCardDelete} 
                    />
                    <Route exact path="/sign-in">
                        <Login onLogin={onLogin} onStatus={onStatus} />
                    </Route>
                    <Route exact path="/sign-up">
                        <Register onRegister={onRegister} onStatus={onStatus} />
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
                    </Route>
                </Switch>
            </Router>
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <PopupWithForm name="confirmation" title="Вы уверены?" btnLabel="Да" onClose={closeAllPopups}/>
            <InfoTooltip isOpen={isInfoTooltipOpen} isSuccess={isRegisterSuccess} onClose={closeAllPopups}/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;