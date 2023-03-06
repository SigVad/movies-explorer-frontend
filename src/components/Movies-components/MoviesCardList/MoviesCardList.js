// управляет отрисовкой карточек фильмов на страницу и их количеством.
import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ 
  location,
  filmsList, //фильмы movies из setFilms(поиск(короткие(localStorage)))
  quantityFilms, //выводимое количество фильмов
  toggleSavedFilm, //если нажать на кнопку
  savedFilms, //из бд
  filmIsSaved, //проверка на наличие фильма в бд
  onMoreFilmsClick, //если нажать на Ещё
}) {
  console.log(`${filmsList.length} > ${quantityFilms}`);
  return (
    
    <section className='cards'>
      <ul className="cards__list">
        { 
        filmsList.map((card, index)=>{
          if (index < quantityFilms) {
            return ( 
              <MoviesCard
                location = {location}
                key={card.movieId}
                card={card}
                filmIsSaved={filmIsSaved}
                toggleSavedFilm={toggleSavedFilm}
              />
            )
          } 
        })
        }
      </ul>
      { (filmsList.length > quantityFilms)
          ? <button className='cards__button' type='button' onClick={onMoreFilmsClick}>Ещё</button>
          : <div className='cards__not-button'></div>
      }
       </section>
  );
}

export default MoviesCardList;
