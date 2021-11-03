import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if(isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm name="add-card" title="Новое место" btnLabel="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__info">
                <label className="popup__field-label">
                    <input type="text" className="popup__field popup__field_text_place" name="name" id="place-name" placeholder="Название" 
                        autoComplete="off" required minLength="2" maxLength="30" value={name} onChange={handleChangeName} />
                    <span className="popup__field-error place-name-error"></span>
                </label>
                <label className="popup__field-label">
                    <input type="url" className="popup__field popup__field_text_link" name="link" id="place-link" placeholder="Ссылка на картинку" 
                        autoComplete="off" required value={link} onChange={handleChangeLink} />
                    <span className="popup__field-error place-link-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;


