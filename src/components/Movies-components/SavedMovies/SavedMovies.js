// компонент страницы с сохраненными фильмамb.
import './SavedMovies.css';
import { useLocation } from "react-router-dom";
import Header from '../../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';

function SavedMovies() {
  const location = useLocation().pathname;
  const loggedIn = true;
    
  return (
    <>
      <Header loggedIn={loggedIn}  location = {location} />
      <main className='saved-movies'>
        <SearchForm />
        <Preloader />
        <MoviesCardList location = {location} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;