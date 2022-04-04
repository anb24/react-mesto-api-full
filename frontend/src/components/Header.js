import logo from '../images/header/logo.svg';
import NavBar from './NavBar';
import {useLocation} from 'react-router-dom';

function Header(props) {
    const location = useLocation();
    return (<header className="header">

        <a
            href="./"
            className="header__link"
            target="_self">
            <img src={logo} alt="Логотип" className="header__logo"/>
        </a>
        <NavBar
            {...props}
            location={location}
        />
    </header>);
}

export default Header;