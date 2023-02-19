// фильтр с чекбоксом «Только короткометражки»
import './FilterCheckbox.css';
import { useCallback, useState, memo } from "react";

const FilterCheckbox = memo(() => {
	const [isSelected, setIsSelected] = useState(false);
	const onSelect = useCallback(
	  () => setIsSelected(!isSelected),
	  [isSelected]
	);
	return (
		<div className="checkbox">
			<div className={`checkbox__button ${isSelected ? "checkbox__button_is-selected" : ""}`} onClick={onSelect}>
              <div className={`checkbox__button-circle ${isSelected ? "checkbox__button-circle_is-selected" : ""}`} />
			</div>
			<div className="checkbox__title">Короткометражки</div>
		</div>
	);
});

export default FilterCheckbox;