// фильтр с чекбоксом «Только короткометражки»
import './FilterCheckbox.css';

function FilterCheckbox({ shortFilms, toggleShortFilms }) {
  // console.log(`FilterCheckbox ${shortFilms}`);
  return (
    <div className="checkbox">
      <div className={`checkbox__button ${shortFilms ? "" : "checkbox__button_is-selected"}`} onClick={toggleShortFilms}>
          <div className={`checkbox__button-circle ${shortFilms ? "" : "checkbox__button-circle_is-selected"}`} />
      </div>
      <div className="checkbox__title">Короткометражки</div>
    </div>
  );
};

export default FilterCheckbox;