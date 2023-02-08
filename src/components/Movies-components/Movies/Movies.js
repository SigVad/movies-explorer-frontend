// компонент страницы с поиском по фильмам.
import './Movies.css';
import { useLocation } from "react-router-dom";
import Header from '../../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';

function Movies() {
  const location = useLocation().pathname;
  const loggedIn = true;

  return (
    <>
      <Header loggedIn={loggedIn}  location = {location} />
      <main className='movies'>
        <SearchForm />
        <Preloader />
        <MoviesCardList location = {location} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;