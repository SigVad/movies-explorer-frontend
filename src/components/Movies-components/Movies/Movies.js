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
    windowSize,//тип размера экрана
    filmsList,//фильмы movies из setFilms(поиск(короткие(localStorage)))
    quantityFilms, //выводимое количество фильмов
    toggleSavedFilm,//если нажать на кнопку
    savedFilms,//из бд
    filmIsSaved,//проверка на наличие фильма в бд
    onMoreFilmsClick,//если нажать на Ещё
  }) {
  const location = useLocation().pathname;

  return (
    <>
      <Header loggedIn={loggedIn}  location = {location} />
      <main className='movies'>
        <SearchForm 
          shortFilms = {shortFilms}//чекбокс
          toggleShortFilms = {toggleShortFilms}//действие на чекбокс
          onSearch = {onSearch}//Поиск
          searchText = {searchText}//текст для фильтра
        />

			  { (isLoading) 
          ? <Preloader />
          : (filmsList === []) 
            ? (searchText !== '') && (<p className={`movies__message`}>Ничего не найдено</p>)
            : <MoviesCardList
                location = {location}
                filmsList = {filmsList}//фильмы movies из setFilms(поиск(короткие(localStorage)))
                quantityFilms = {quantityFilms} //выводимое количество фильмов
                toggleSavedFilm = {toggleSavedFilm}//если нажать на кнопку
                savedFilms = {savedFilms}//из бд
                filmIsSaved = {filmIsSaved}//проверка на наличие фильма в бд
                onMoreFilmsClick = {onMoreFilmsClick}//если нажать на Ещё
              />
        }
      </main>
      <Footer />
    </>
  )
}

export default Movies;