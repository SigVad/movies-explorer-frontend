//  компонент страницы «О проекте».

import './Main.css';
import Header from '../../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../../Footer/Footer';
import { useLocation } from 'react-router-dom';

function Main({loggedIn}) {
  const location = useLocation().pathname;

  return (
    <>
      <Header loggedIn={loggedIn} location={location} />
      <main className='main'>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}

export default Main;