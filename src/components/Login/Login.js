// компонент страницы авторизации. /signin

import '../Register/Register.css';
import './Login.css';
import Header from '../Header/Header';
import { withRouter, Link } from 'react-router-dom';
import {useForm} from '../../hooks/useForm';

function Login(props) {

   const authData =  useForm({email:'', password:''});

  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin({
      email: authData.values.email,
      password: authData.values.password,
    });
    authData.setValues({email:'', password:''});
  }

  return (
    <main className="login">
      <Header loggedIn={props.loggedIn} />
      <form 
        action="/signup"
        className="form"
        noValidate
        onSubmit={ handleSubmit }
      >
        <p className="form__title">Рады видеть!</p>
        <p className="form__label login__label">
          <label htmlFor="email" className="form__text">E-mail</label>
          <input
            required
            minLength="2" 
            maxLength="30" 
            className="form__input"
            name="email"
            type="email"
            id="email"
            placeholder=''
            onChange={authData.handleChange}
            value={authData.values.email}
          />
          <span className="form__input-error">
          </span>
        </p>
        <p className="form__label login__label">
          <label htmlFor="pass" className="form__text">Пароль</label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="pass"
            placeholder=''
            required
            minLength="6" 
            onChange={authData.handleChange}
            value={authData.values.pass}
            autoComplete="off"
          />
          <span className="form__input-error">
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

export default withRouter(Login);