// компонент страницы изменения профиля.
import './Profile.css';
import Header from '../Header/Header';
import { useLocation, Link } from "react-router-dom";

const name = "Виталий";
const email = "pochta@yandex.ru";

function Profile() {
  const loggedIn = true;
  const location = useLocation().pathname;

  return (
    <>
      <Header loggedIn={loggedIn} location = {location} />
      <main className='profile'>
          <h2 className='profile__title'>Привет, {name}!</h2>
        <div className='profile__line'>
          <p className='profile__line-text'>Имя</p>
          <p className="profile__line-text">{name}</p>
        </div>
        <div className='profile__line'>
          <p className='profile__line-text'>E-mail</p>
          <p className="profile__line-text">{email}</p>
        </div>
        <Link className="profile__link" to="/signup">
          Редактировать
        </Link>
        <Link className="profile__link" to="/">
          Выйти из аккаунта
        </Link>
      </main>
    </>
  )
}

export default Profile;