// компонент, который отрисовывает шапку сайта на страницу.

import { Link } from "react-router-dom";
import './Header.css';
import logo from "../../images/logo.svg";
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, location="none" }) {
  return (
    <header className = {`header 
    ${ (location === "/") && 'header_type_purple'}
    ${ (location === "none") && 'header_type_none'}
    }`}>
      <Link className="header__link" to="/">
        <img className="header__logo" src={logo} alt="логотип кольцо" />
      </Link>

      {
        location !== "none" &&
        <Navigation loggedIn={loggedIn} location = {location} />
      }
    </header>
  )
}

export default Header;