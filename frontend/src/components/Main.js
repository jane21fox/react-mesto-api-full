import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile container__profile">
                <a href="#" className="profile__avatar-container" onClick={onEditAvatar}>    
                    {currentUser !== null && <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar" />}
                    <span className="profile__avatar-edit-btn"></span>
                </a>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{currentUser?.name}</h1>
                        <button className="profile__edit-button container__button" type="button" aria-label="Редактировать профиль" 
                            onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__status">{currentUser?.about}</p>
                </div>
                <button className="profile__add-button container__button" type="button" aria-label="Добавить место" 
                    onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                {cards.map ((item) => {
                    return (
                        <Card 
                            key={item._id} 
                            card={item} 
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike} 
                            onCardDelete={onCardDelete} 
                        />
                    )
                })}
                </ul>
            </section>
        </main>
    );
}

export default Main;