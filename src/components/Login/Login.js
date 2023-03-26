// компонент страницы авторизации. /signin

import '../Register/Register.css';
import './Login.css';
import Header from '../Header/Header';
import { withRouter, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import isEmail from "validator/lib/isEmail";

function Login({ loggedIn, onLogin, isLoading }) {
//console.log(isEmail("1sfffi@kjru"));
  const {
    values, handleChange, errors, isValid, resetForm, setValues
  } = useFormAndValidation();
  const [errorMessage, setErrorMessage] = useState('');

  function emailIsValid(value) { //проверка валидности емаил
    if (value) {
      if (!isEmail(value)) {
        if (!errors.email) {
          errors.email = `Некорректный Email`;
        }
      }
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMessage('');
    Promise.resolve(
      onLogin({
        email:  values.email,
        password:  values.password,
      })
      ).then(resetForm)
      .catch(error => {
        setErrorMessage(error)
      });
  }
  
  function isValidAndNotError() {
    return isValid 
            && (!errors.email || errors.email === '')
            && (!errors.password || errors.password === '');
  }

  return (
    <main className="login">
      <Header loggedIn={loggedIn} />
      <form 
        id='login-form'
        action="/signup"
        className="form"
        noValidate
        onSubmit={ handleSubmit }
      >
        <p className="form__title">Рады видеть!</p>
        <p className="form__label login__label">
          <label htmlFor="login-email" className="form__text">E-mail</label>
          <input 
            validations={[emailIsValid(values.email, errors.email)]}
            className={`form__input ${ errors.email && 'form__input_type_error' }`}
            required
            minLength="2" 
            maxLength="30" 
            // pattern="/^.+@(?:[\w-]+\.)+\w+$/"
            name="email"
            type="email"
            id="login-email"
            placeholder=''
            onChange={ handleChange }
            value={values.email ?? ''}
            disabled={isLoading}
          />
          <span className="form__input-error form__input-error_active">
            {errors.email}
          </span>
        </p>
        <p className="form__label login__label">
          <label htmlFor="login-pass" className="form__text">Пароль</label>
          <input
            htmlFor="login-form"
            className={`form__input ${ errors.password && 'form__input_type_error' }`}
            type="password"
            name="password"
            id="login-pass"
            placeholder=''
            required
            minLength="6" 
            onChange={ handleChange }
            value={values.password ?? ''}
            // autoComplete="off"
            disabled={isLoading}
          />
          <span className="form__input-error">
            {errors.password}
          </span>
        </p>
        <button className={
          `form__submit-button ${ isValidAndNotError() && 'form__submit-button_active'} login__submit-button`
          } type="submit" disabled={!isValidAndNotError()}>
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