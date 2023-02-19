// компонент с вёрсткой баннера страницы «О проекте»
import image from '../../../images/landing-TT.svg';
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <img src={image} alt="фон: буква П в сетке и круге" className="promo__image" />
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  )
} 

export default Promo;