function InfoTooltip({ isOpen, onClose, isSuccess }) {

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_info">
                <button className="popup__close-button container__button" 
                    type="button" aria-label="Закрыть окно" onClick={onClose}></button>
                <div className={`popup__status ${isSuccess ? 'popup__status_type_success' : 'popup__status_type_error'}`}></div>
                <p className="popup__info-message">{`${isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}`}</p>
            </div>
        </div>
    );
}

export default InfoTooltip;