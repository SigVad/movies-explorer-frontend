// компонент страницы регистрации. /signup
import './Register.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Register() {
  const loggedIn = false;

  return (
    <main className="register">
      <Header loggedIn={loggedIn} />
      <form action="/signup" className="form" noValidate>
        <p className="form__title">Добро пожаловать!</p>
        <p className="form__label">
          <label for="name" className="form__text">Имя</label>
          <input
            className="form__input"
            name="name"
            id="name"
            minLength="5"
            maxLength="15"
            placeholder='Необходимо ввести имя'
          />
          <span className="form__input-error name-input-error">
          Что-то пошло не так...
          </span>
        </p>
        <p className="form__label">
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
        <p className="form__label">
          <label for="pass"  className="form__text">Пароль</label>
          <input
            className="form__input form__input_type_error"
            type="password"
            name="password"
            id="pass"
            minLength="7"
          />
          <span className="form__input-error form__input-error_active">
            Что-то пошло не так...
          </span>
        </p>
        <button className="form__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <p className="form__text form__text_sub">
          Уже зарегистрированы?{" "}
          <Link className="form__link" to="/signin">
            Войти
          </Link>
        </p>
      </form>
    </main>
  )
}

export default Register;