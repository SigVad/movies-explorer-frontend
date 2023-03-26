// компонент страницы с сохраненными фильмамb.
import './SavedMovies.css';
import { useLocation } from "react-router-dom";
import Header from '../../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';

function SavedMovies({
  loggedIn,//статус авторизации, влияет на хедер
  isLoading,//на прелоадер
  shortFilmsDb,//чекбокс
  toggleShortFilmsDb,//действие на чекбокс
  onSearchDb,//Поиск
  searchTextDb,//текст для фильтра
  savedFilmsList,//фильмы из базы
  quantityFilms, //выводимое количество фильмов
  toggleSavedFilm,//если нажать на кнопку
  IsSaved,
  inspectFilmIsSaved,//проверка на наличие фильма в бд
  onMoreFilmsClick,//если нажать на Ещё
}) {
  const location = useLocation().pathname;
  
  return (
    <>
      <Header loggedIn={loggedIn}  location = {location} />
      <main className='saved-movies'>
        <SearchForm 
          location = {location}
          shortFilms = {shortFilmsDb}//чекбокс
          toggleShortFilms = {toggleShortFilmsDb}//действие на чекбокс
          onSearch = {onSearchDb}//Поиск
          searchText = {searchTextDb}//текст для фильтра
        />

			  { (isLoading) 
          ? <Preloader />
          : <MoviesCardList
              location = {location}
              filmsList = {savedFilmsList}//фильмы movies из setFilms(поиск(короткие(localStorage)))
              quantityFilms = {quantityFilms} //выводимое количество фильмов
              toggleSavedFilm = {toggleSavedFilm}//если нажать на кнопку
              inspectFilmIsSaved = {inspectFilmIsSaved}//проверка на наличие фильма в бд
              IsSaved = {IsSaved}
              onMoreFilmsClick = {onMoreFilmsClick}//если нажать на Ещё
            />
        }
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;