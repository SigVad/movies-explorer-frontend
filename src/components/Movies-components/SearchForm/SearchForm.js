// форма поиска, куда пользователь будет вводить запрос.
import './SearchForm.css';
import { useState, useEffect } from "react";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({  
    location,
    shortFilms, //чекбокс
    toggleShortFilms, //действие на чекбокс
    onSearch, //Поиск
    searchText, //текст для фильтра
  }){
    
	const [text, setText] = useState(searchText);


	useEffect(() => {
		setText(text);
	}, [])
  
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
        <span className="search-form__error">
          {}
        </span>
      </form>
      <div className='search-form__checkbox'>
        <FilterCheckbox 
          shortFilms={shortFilms}
          toggleShortFilms={toggleShortFilms}
          location={location}
        />
      </div>
    </div>
  )
}

export default SearchForm;