// форма поиска, куда пользователь будет вводить запрос.
import './SearchForm.css';
import { useState } from "react";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({  
    shortFilms, //чекбокс
    toggleShortFilms, //действие на чекбокс
    onSearch, //Поиск
    searchText //текст для фильтра
  }){
	const [text, setText] = useState(searchText);
  

  function onSubmit(evt){
		evt.preventDefault();
    onSearch(text);
  }

	function handleSearch(evt) {
		setText(evt.target.value)
	}

  return (
    <div className='search-form'>
      <form 
        className='search-form__container' 
        name='SearchMovie' 
        onSubmit={onSubmit}
      >
        <input 
          className='search-form__input' 
          type='text' 
          placeholder='Фильм' 
          name='search-movie' 
          value={text}
          // required
          onChange={handleSearch}
        ></input>
        <button className='search-form__button' type='submit'>Поиск</button>
      </form>
      <div className='search-form__checkbox'>
        <FilterCheckbox 
          shortFilms={shortFilms}
          toggleShortFilms={toggleShortFilms}
        />
      </div>
    </div>
  )
}

export default SearchForm;