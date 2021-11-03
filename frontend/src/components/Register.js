import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = ({ onRegister, onStatus }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onRegister({ password, email })
        .then(() => {
            onStatus(true);
            resetForm();
            history.push('/sign-in');
        })
        .catch((err) => {
            onStatus(false);
        });
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/main');
        }
    }, []);

    return(
    <div className="auth__container">
        <form name="register" onSubmit={handleSubmit}>
            <h2 className="auth__title">Регистрация</h2>
            <fieldset className="auth_info">
                <label className="auth__field-label">
                    <input type="email" className="auth__field" name="email" id="email" placeholder="Email" 
                        autoComplete="off" required minLength="2" maxLength="40" value={email} onChange={handleChangeEmail} />
                    {/* <span className="popup__field-error user-name-error"></span> */}
                </label>
                <label className="auth__field-label">
                    <input type="password" className="auth__field" name="password" id="password" placeholder="Пароль" 
                        autoComplete="off" required minLength="2" maxLength="16" value={password} onChange={handleChangePassword} />
                    {/* <span className="popup__field-error user-status-error"></span> */}
                </label>
            </fieldset>
            <button className="auth__button" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
        </form>
        <div className="auth__signin">
            <p>Уже зарегистрированы?&nbsp;</p>
            <Link to="login" className="auth__login-link">Войти</Link>
        </div>
    </div>
    );
}

export default Register;