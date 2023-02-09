// компонент, который отвечает за меню навигации на сайте.
import "./Navigation.css";
import avatar from "../../images/people.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navigation({ loggedIn, location }) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
 
  const onBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  }
  if (!loggedIn) { //для Main
    return (
      <nav className="navigation">
        <Link to="/signup" className="navigation__link navigation__link-signup">Регистрация</Link>
        <Link to="/signin" className="navigation__link navigation__link-signin">Войти</Link>
      </nav>
    )
  } else { //для Movies
    return (
      <>
        <button type="button" className={`navigation__burger
          ${isBurgerOpen ? "display_none" : ""}`} onClick={onBurger}>
          <div className="navigation__burger-line"></div>
          <div className="navigation__burger-line"></div>
          <div className="navigation__burger-line"></div>
        </button>

        <div className={`navigation__burger-box 
          ${isBurgerOpen ? "display_open" : "display_none"}`}></div>

        <button type="button" className={`navigation__close-burger
          ${isBurgerOpen ? "display_open" : ""}`} onClick={onBurger}>
        </button>

        <nav className={`navigation navigation_signed
          ${isBurgerOpen ? "display_open" : ""}`
        }>
          <Link to="/" className={`
            navigation__link
            navigation__link-master
            navigation__link_signed
            ${isBurgerOpen ? "display_open" : "display_none"}
          `} >Главная</Link>
          <Link to="/movies" className={`
            navigation__link
            navigation__link-movies
            navigation__link_signed 
            ${(location === "/movies") ? "navigation__link_is-location" : ""}
          `}>Фильмы</Link>
          <Link to="/saved-movies" className={`
            navigation__link
            navigation__link-saved-movies
            navigation__link_signed
            ${(location === "/saved-movies") ? "navigation__link_is-location" : ""}
          `}>Сохраненные фильмы</Link>
          <Link to="/profile" className="
            navigation__link
            navigation__link-profile
            navigation__link_signed
          "> 
            <img src={avatar} alt="логотип человечек" className="navigation__link-profile-avatar"></img>
            <p className="navigation__link-profile-text">Аккаунт</p>
          </Link>
        </nav>
        
      </>
    )
  }
}

export default Navigation;