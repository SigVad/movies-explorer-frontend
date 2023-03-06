// компонент одной карточки фильма.
import "./MoviesCard.css";
import { useCallback, useState } from "react";
import iconX from "../../../images/icon-X.svg";
import iconV from "../../../images/icon-V.svg";


function MoviesCard({ 
  card,
  location,
  filmIsSaved,
  toggleSavedFilm
}) {

	const [isSelected, setIsSelected] = useState(filmIsSaved(card.movieId));
	
  const onSelect = useCallback(
	  () => {
      setIsSelected(!isSelected);
      toggleSavedFilm(card);
    },
	  [isSelected]
	);
  
  function isMoviesPage() {
      if (location === "/movies") {
        return true; // iconV
      }
      return false; // iconX
    }

    return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__title">{card.nameRU}</h2>
        <p className="card__duration">{card.duration} минут</p>
      </div>
			<a className="card__link" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__photo" src={card.image} alt="постер фильма" />
			</a>
        {
          isSelected
            ? <button type="button" className={`card__button 
                ${isMoviesPage() ? "card__button_red" : ""
              }`} onClick={onSelect}>
                <img className="card__button-icon" 
                  src={isMoviesPage() ? iconV : iconX
                } alt="иконка" />
              </button>
            : <button type="button" className="card__button" onClick={onSelect}>
                Сохранить
              </button>
        }
    </li>
  )
}

export default MoviesCard;