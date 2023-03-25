// компонент страницы изменения профиля.
import '../Register/Register.css';
import './Profile.css';
import Header from '../Header/Header';
import { useLocation, withRouter } from "react-router-dom";
import {useFormAndValidation} from '../../hooks/useFormAndValidation';
import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import isEmail from "validator/lib/isEmail";

function Profile({ loggedIn, onChangeUserInfo, signOut, isLoading }) {
  const location = useLocation().pathname;
	const currentUser = useContext(CurrentUserContext);

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
    if (isNotDublicate()){
    setErrorMessage('');
    Promise.resolve(
      onChangeUserInfo({
        name:  values.name ? values.name : preventValues().name,
        email: values.email ? values.email : preventValues().email,
      })
    ).then(resetForm)
    .catch(error => {
      setErrorMessage(error.message)
    });
  }
  }

  function preventValues(evt) {
    return { name: currentUser.name, email: currentUser.email };
  }

  function isNotDublicate() {
    return !(
      (currentUser.name === values.name || !values.name)
      &&
      (currentUser.email === values.email || !values.email)
      );
  }

  function isValidAndNotError() {
    return isValid 
            && (!errors.name || errors.name === '')
            && (!errors.email || errors.email === '')
            && isNotDublicate();
  }

  return (
    <main className="profile">
      <Header loggedIn={loggedIn} location = {location} />
      <form className='form profile__form' 
        onSubmit={ handleSubmit }
        noValidate
      >
          <h2 className='form__title profile__title'>Привет, {currentUser.name}!</h2>
        <p className='form__label profile__label'>
          <label  htmlFor="name" className='form__text'>Имя</label>
          <input 
            className={`form__input ${ errors.name && 'form__input_type_error' }  profile__input`}
						type='text'
            required
            minLength="2"
            maxLength="30"
            pattern='[A-Za-zА-яа-яёЁ\s\-]+$'
            name="name"
            id="register-name"
            placeholder=''
            onChange={ handleChange }
            value={ values.name || values.name==='' ? values.name : preventValues().name }
            disabled={isLoading}
          />
          <span className="form__input-error form__input-error_active profile__input-error">
            {errors.name}
          </span>
        </p>
        <p className="form__label profile__label">
          <label htmlFor="profile-email" className="form__text">E-mail</label>
          <input 
            validations={[emailIsValid(values.email, errors.email)]}
            className={`form__input ${ errors.email && 'form__input_type_error' }  profile__input`}
            required
            minLength="2" 
            maxLength="30" 
            name="email"
            type="email"
            id="profile-email"
            placeholder=''
            onChange={ handleChange }
            value={ values.email || values.email ==='' ? values.email : preventValues().email }
            disabled={isLoading}
          />
          <span className="form__input-error profile__input-error">
            {errors.email}
          </span>
        </p>
        <button className={
          `profile__button ${isValidAndNotError() && 'profile__button_active'}`
          } type="submit" disabled={!isValidAndNotError()}
        >
          Редактировать
        </button>
        <button className="profile__button profile__button_active profile__button_type_isOut" onClick={signOut}>
          Выйти из аккаунта
        </button>
      </form>
    </main>
  )
}

export default withRouter(Profile);