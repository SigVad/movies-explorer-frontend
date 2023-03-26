// компонент страницы с поиском по фильмам.
import './Movies.css';
import { useLocation } from "react-router-dom";
import Header from '../../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';

function Movies({
    loggedIn,//статус авторизации, влияет на хедер
    isLoading,//на прелоадер
    shortFilms,//чекбокс
    toggleShortFilms,//действие на чекбокс
    onSearch,//Поиск
    searchText,//текст для фильтра
    filmsList,//фильмы movies из setFilms(поиск(короткие(localStorage)))
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
      <main className='movies'>
        <SearchForm 
          location = {location}
          shortFilms = {shortFilms}//чекбокс
          toggleShortFilms = {toggleShortFilms}//действие на чекбокс
          onSearch = {onSearch}//Поиск
          searchText = {searchText}//текст для фильтра
        />

			  { (isLoading) 
          ? <Preloader />
          : <MoviesCardList
              location = {location}
              filmsList = {filmsList}//фильмы movies из setFilms(поиск(короткие(localStorage)))
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

export default Movies;