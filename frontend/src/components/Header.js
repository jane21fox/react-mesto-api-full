import logo from '../images/header-logo.svg';
// import menu from '../images/menu.svg';
// import close from '../images/close-menu.svg';
import { Link, useLocation } from 'react-router-dom'; 

function Header( {loggedIn, onSignOut, userData}) {
    
    const location = useLocation();

    return (
        <header className="header container__header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div className="header__container">
                <p className="header__userinfo">{userData.email}</p>
                <nav className="header__nav">
                    <ul className="header__nav-items">
                        {!loggedIn && location.pathname === "/sign-in" && <li> 
                            <Link to="/sign-up" className="header__link">
                                Регистрация
                            </Link>
                        </li>}
                        {!loggedIn && location.pathname === "/sign-up" &&<li> 
                            <Link to="/sign-in" className="header__link">
                                Войти
                            </Link>
                        </li>}
                        {loggedIn && <li> 
                            <Link to="/sign-in" onClick={onSignOut} className="header__link">
                                Выйти
                            </Link>
                        </li>}
                    </ul>
                </nav>
            </div>
            {/* {loggedIn && <img src={isMenuOpened ? close : menu} alt="Меню" className="container__button header__menu-icon" onClick={handleClickMenu} />} */}
        </header>
    );
}

export default Header;