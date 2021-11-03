import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__delete-button container__button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`; 

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить место" onClick={handleDeleteClick}></button>
            <div className="element__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
            <div className="element__text-container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;