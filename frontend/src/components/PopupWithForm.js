function PopupWithForm({ title, name, btnLabel, isOpen, onClose, onSubmit, children }) {
    
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-button popup__close-button_type_profile container__button" 
                    type="button" aria-label="Закрыть окно" onClick={onClose}></button>
                <form className={`popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__button" type="submit" aria-label="Сохранить изменения">{btnLabel}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;


