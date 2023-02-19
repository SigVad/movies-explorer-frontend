// компонент страницы авторизации. /signin
import '../Register/Register.css';
import './Login.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Login() {
  const loggedIn = false;

  return (
    <main className="login">
      <Header loggedIn={loggedIn} />
      <form action="/signin" className="form" noValidate>
        <p className="form__title">Рады видеть!</p>
        <p className="form__label login__label">
          <label for="email" className="form__text">E-mail</label>
          <input
            className="form__input"
            name="email"
            type="email"
            id="email"
            placeholder='Необходимо ввести e-mail'
          />
          <span className="form__input-error">
            Что-то пошло не так...
          </span>
        </p>
        <p className="form__label login__label">
          <label for="pass" className="form__text">Пароль</label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="pass"
            minLength="7"
          />
          <span className="form__input-error">
            Что-то пошло не так...
          </span>
        </p>
        <button className="form__submit-button login__submit-button" type="submit">
        Войти
        </button>
        <p className="form__text form__text_sub">
        Еще не зарегистрированы?{" "}
          <Link className="form__link" to="/signup">
          Регистрация
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Login;