function ImagePopup(props) {
    
    return (
        <div className={`popup popup_type_show-card ${props.card !== null && 'popup_opened'}`}>
            <div className="popup__image-container">
                <button className="popup__close-button popup__close-button_type_show-card container__button" 
                    type="button" aria-label="Закрыть окно" onClick={props.onClose}></button>
                    {props.card !== null && <img src={props.card.link} alt="Фото" className="popup__image" />}
                    {props.card !== null && <p className="popup__place-name">{props.card.name}</p>}
            </div>
        </div>
    );
}

export default ImagePopup;

