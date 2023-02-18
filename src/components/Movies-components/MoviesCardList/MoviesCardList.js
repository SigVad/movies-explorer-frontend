// управляет отрисовкой карточек фильмов на страницу и их количеством.
import React from "react";
import "./MoviesCardList.css";
import { cardsList } from "../../../constants/cards";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ location }) {

  return (
    <section className='cards'>
      <ul className="cards__list">
        { cardsList.map((card)=>{
          return ( 
              <MoviesCard
                location = {location}
                card={card}
              />
            )
          }
          )
        }
      </ul>
      { (location === "/movies")
          ? <button className='cards__button' type='button'>Ещё</button>
          : <div className='cards__not-button'></div>
      }
       </section>
  );
}

export default MoviesCardList;
