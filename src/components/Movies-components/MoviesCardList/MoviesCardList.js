// управляет отрисовкой карточек фильмов на страницу и их количеством.
import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";

function MoviesCardList({ 
  location,
  filmsList, //фильмы movies из setFilms(поиск(короткие(localStorage)))
  quantityFilms, //выводимое количество фильмов
  toggleSavedFilm, //если нажать на кнопку
  inspectFilmIsSaved, //проверка на наличие фильма в бд
  onMoreFilmsClick, //если нажать на Ещё
}) {
  
  // console.log(`${filmsList.length} > ${quantityFilms}`);
  return (
    
    <section className='cards'>
      <ul className="cards__list">
        { 
        filmsList.map((card, index)=>{
          if (index < quantityFilms && location === "/movies"){
            let save = false;
            let id = inspectFilmIsSaved(card.movieId);
            if (id) {
              card._id = id;
              save = true;
            }
            return ( 
              <MoviesCard
                location = {location}
                key={card.movieId}
                card={card}
                isSaved={save}
                toggleSavedFilm={toggleSavedFilm}
              />
            )
          } else if (location === "/saved-movies"){
            return ( 
              <MoviesCard
                location = {location}
                key={card.movieId}
                card={card}
                isSaved={true}
                toggleSavedFilm={toggleSavedFilm}
              />
            )
          }

        })
        }
      </ul>
      { (filmsList.length > quantityFilms && location === "/movies")
          ? <button className='cards__button' type='button' onClick={onMoreFilmsClick}>Ещё</button>
          : <div className='cards__not-button'></div>
      }
       </section>
  );
}

export default MoviesCardList;
