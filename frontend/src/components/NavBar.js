import {Link} from "react-router-dom";
import UserLinks from "./UserLinks";

function NavBar({isLoggedIn, signOut, userData, location, handleMenuOpen, isMenuOpen}) {


    function showAuthLinks() {
        if (location.pathname === '/sign-up') {
            return (<li className="navbar__item">
                <Link to="/sign-in" className="navbar__link">
                    Вход
                </Link>
            </li>);
        } else {
            return (<li className="navbar__item">
                <Link to="/sign-up" className="navbar__link">
                    Регистрация
                </Link>
            </li>);
        }
    }

    function showEmailAndExit() {
        if (isLoggedIn && window.innerWidth < 768) {
            return (<>
                <button
                    className={`header__menu-button ${isMenuOpen ? 'header__menu-button_type_opened' : 'header__menu-button_type_closed'}`}
                    aria-label="menu button"
                    onClick={handleMenuOpen}
                />
            </>);
        }
        return (<UserLinks
            userData={userData}
            signOut={signOut}
            isMenuOpen={isMenuOpen}
        />);
    }

    return (<ul className="navbar">
        {isLoggedIn ? showEmailAndExit() : showAuthLinks()}
    </ul>);
}

export default NavBar;