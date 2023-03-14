// фильтр с чекбоксом «Только короткометражки»
import './FilterCheckbox.css';

function FilterCheckbox({ location, shortFilms, toggleShortFilms }) {
  
  // console.log(`FilterCheckbox ${shortFilms}`);
  function onClick(evt){
		evt.preventDefault();
    toggleShortFilms();
  }

  return (
    <div className="checkbox">
      <div className={`checkbox__button ${shortFilms ? "" : "checkbox__button_is-selected"}`} onClick={onClick}>
          <div className={`checkbox__button-circle ${shortFilms ? "" : "checkbox__button-circle_is-selected"}`} />
      </div>
      <div className="checkbox__title">Короткометражки</div>
    </div>
  );
};

export default FilterCheckbox;