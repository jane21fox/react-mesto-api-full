import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" btnLabel="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__info">
                <label className="popup__field-label">
                    <input type="url" ref={avatarRef} className="popup__field popup__field_text_avatar" name="avatar" 
                        id="avatar" placeholder="Ссылка на картинку" autoComplete="off" required />
                    <span className="popup__field-error avatar-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;