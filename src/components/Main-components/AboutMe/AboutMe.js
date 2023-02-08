//компонент с информацией о студенте
import "./AboutMe.css";
import userPhoto from "../../../images/userPhoto.png";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__content-info">
            <h3 className="about-me__name">Вадим</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 32 года</p>
            <p className="about-me__text">
            Я родился и живу в Волгодонске Ростовской области, закончил факультет 
            информациоонй безопасности ТТИ ЮФУ. 
            У меня есть жена и дочь. Я люблю путешествовать и отдыхать с семьёй.
            Уже несколько лет работаю в отделе разработки ПО - тестирую и оказываю 
            техподдержку.
            После того, как прошёл курс по веб-разработке, планирую самостоятельно 
            изучить фреймворк Angular и стать одним из разработчиков своего отдела.
            </p>
            <a href="https://github.com/" className="about-me__link" target="_blank" rel="noreferrer">
            Github
            </a>
        </div>
		    <img className='about-me__avatar' alt='Аватар' src={userPhoto} />
      </div>
    </section>
  );
}

export default AboutMe;