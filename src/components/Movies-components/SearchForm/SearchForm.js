// форма поиска, куда пользователь будет вводить запрос.
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSubmit }) {
  return (
    <div className='search-form'>
      <form className='search-form__container' name='SearchMovie' onSubmit={onSubmit}>
        <input className='search-form__input' type='text' placeholder='Фильм' name='search-movie' required></input>
        <button className='search-form__button' type='submit'>Поиск</button>
      </form>
      <div className='search-form__checkbox'>
        <FilterCheckbox />
      </div>
    </div>
  )
}

export default SearchForm;