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
      <div className="navigation">
        <nav className="navigation__links">
          <Link to="/signup" className="navigation__link navigation__link-signup">Регистрация</Link>
          <Link to="/signin" className="navigation__link navigation__link-signin">Войти</Link>
        </nav>
      </div>
    )
  } else { //для Movies
    return (
      <div className="navigation">
        <button type="button" className={`navigation__burger
          ${isBurgerOpen ? "navigation__none" : ""}`} onClick={onBurger}>
          <span className="navigation__burger-line"></span>
          <span className="navigation__burger-line"></span>
          <span className="navigation__burger-line"></span>
        </button>

        <div className={`navigation__burger-box 
          ${isBurgerOpen ? "navigation__open" : "navigation__none"}`}></div>

        <button type="button" className={`navigation__close-burger
          ${isBurgerOpen ? "navigation__open" : ""}`} onClick={onBurger}>
        </button>

        <nav className={`navigation__links navigation__signed
          ${isBurgerOpen ? "navigation__open" : ""}`
        }>
          <Link to="/" className={`
            navigation__link
            navigation__link-master
            navigation__link_signed
            ${isBurgerOpen ? "navigation__link_open" : "navigation__none"}
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
        
      </div>
    )
  }
}

export default Navigation;