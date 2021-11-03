import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if(currentUser !== null) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" btnLabel="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__info">
                <label className="popup__field-label">
                    <input type="text" className="popup__field popup__field_text_name" name="name" id="user-name" placeholder="Имя" 
                        autoComplete="off" required minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
                    <span className="popup__field-error user-name-error"></span>
                </label>
                <label className="popup__field-label">
                    <input type="text" className="popup__field popup__field_text_status" name="about" id="user-status" placeholder="О себе" 
                        autoComplete="off" required minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} />
                    <span className="popup__field-error user-status-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;


