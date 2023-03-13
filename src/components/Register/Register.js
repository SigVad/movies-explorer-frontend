// компонент страницы регистрации. /signup
// мануал по React useForm
// https://medium.com/nuances-of-programming/как-легко-создавать-формы-на-react-с-помощью-react-hook-form-9749c8cb3387


import './Register.css';
import Header from '../Header/Header';
import { withRouter, Link } from 'react-router-dom';
import { useState } from 'react';
import {useFormAndValidation} from '../../hooks/useFormAndValidation';

function Register({ loggedIn, onRegister, isLoading }) {

  const {
    values, handleChange, errors, isValid, resetForm, setValues
  } = useFormAndValidation();
  const [errorMessage, setErrorMessage] = useState('');   

  function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMessage('');
    Promise.resolve(
      onRegister({
        name:  values.name,
        email:  values.email,
        password:  values.password,
      })
      ).then(resetForm)
      .catch(error => {
        setErrorMessage(error.message)
      });
  }

  return (
    <main className="register">
      <Header loggedIn={loggedIn} />
      <form 
        action="/signup"
        className="form"
        noValidate
        onSubmit={ handleSubmit }
      >
        <p className="form__title">Добро пожаловать!</p>
        <p className="form__label">
          <label htmlFor="register-name" className="form__text">Имя</label>
          <input 
            className={`form__input ${ errors.name && 'form__input_type_error' }`}
						type='text'
            required
            minLength="2"
            maxLength="30"
            pattern='[A-Za-zА-яа-яёЁ\s\-]+$'
            name="name"
            id="register-name"
            placeholder=''
            onChange={ handleChange }
            value={values.name ?? ''}
            disabled={isLoading}
          />
          <span className="form__input-error name-input-error form__input-error_active">
            {errors.name}
          </span>
        </p>
        <p className="form__label">
          <label htmlFor="register-email" className="form__text">E-mail</label>
          <input 
            className={`form__input ${ errors.email && 'form__input_type_error' }`}
            required
            minLength="2" 
            maxLength="30" 
            name="email"
            type="email"
            id="register-email"
            placeholder=''
            onChange={ handleChange }
            value={values.email ?? ''}
            disabled={isLoading}
          />
          <span className="form__input-error form__input-error_active">
            {errors.email}
          </span>
        </p>
        <p className="form__label">
          <label htmlFor="register-pass"  className="form__text">Пароль</label>
          <input
            className={`form__input ${ errors.password && 'form__input_type_error' }`}
            type="password"
            name="password"
            id="register-pass"
            placeholder=''
            required
            minLength="6" 
            onChange={ handleChange }
            value={values.password ?? ''}
            autoComplete="off"
            disabled={isLoading}
          />
          <span className="form__input-error">
            {errors.password}
          </span>
        </p>
        <button className={
          `form__submit-button ${isValid && 'form__submit-button_active'}`
          } type="submit" disabled={!isValid}>
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

export default withRouter(Register);