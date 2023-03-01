// компонент страницы регистрации. /signup
// мануал по React useForm
// https://medium.com/nuances-of-programming/как-легко-создавать-формы-на-react-с-помощью-react-hook-form-9749c8cb3387


import './Register.css';
import Header from '../Header/Header';
import { withRouter, Link } from 'react-router-dom';
import {useForm} from '../../hooks/useForm';

function Register(props) {

  const authData =  useForm({name:'', email:'', password:''});

  function handleSubmit(event) {
    event.preventDefault();
    props.onRegister({
      name: authData.values.name,
      email: authData.values.email,
      password: authData.values.password,
    });
    authData.setValues({name:'', email:'', password:''});
  }

  return (
    <main className="register">
      <Header loggedIn={props.loggedIn} />
      <form 
        action="/signup"
        className="form"
        noValidate
        onSubmit={ handleSubmit }
      >
        <p className="form__title">Добро пожаловать!</p>
        <p className="form__label">
          <label htmlFor="name" className="form__text">Имя</label>
          <input
            required
            minLength="2"
            maxLength="30"
            pattern="/^[A-Za-zА-яа-я]+$/i"
            className="form__input"
            name="name"
            id="name"
            placeholder=''
            onChange={authData.handleChange}
            value={authData.values.name}
          />
          <span className="form__input-error name-input-error">
          </span>
        </p>
        <p className="form__label">
          <label htmlFor="email" className="form__text">E-mail</label>
          <input
            required
              // validate: (input) => isEmail(input), // true, если корректный
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
        <p className="form__label">
          <label htmlFor="pass"  className="form__text">Пароль</label>
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
          <span className="form__input-error form__input-error_active">
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

export default withRouter(Register);