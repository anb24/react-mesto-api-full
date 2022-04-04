import {Link} from "react-router-dom";

function UserLinks({userData, signOut, isMenuOpen}) {
    return (<>
        <li className="navbar__item">
            <Link to="#" className={`navbar__link ${isMenuOpen ? 'navbar__link_place_wrap' : ''}`}>
                {userData.email}
            </Link>
        </li>
        <li className="navbar__item">
            <Link to="/" onClick={signOut}
                  className={`navbar__link ${isMenuOpen ? 'navbar__link_place_wrap' : ''}`}>
                Выйти
            </Link>
        </li>
    </>);
}

export default UserLinks;