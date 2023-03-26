//В классе описаны запросы к серверу сохраненных фильмов
import { MAIN_DB_URL } from './constants.js';

class MainApi {
  constructor({ baseUrl, headers, credentials}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkAnswer = (res) => {//проверить ответ
    if (res.ok) {
      return res.json();
    }
    console.log(`Ошибка ${res.status}`);
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {//запроcить список сохраненных фильмов
    // console.log(`getMovies (запроcить список сохраненных фильмов)`);
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: this._credentials,
    })
    .then(this._checkAnswer);
  }

  getUserInfo() {//запроcить инф. пользователя
    // console.log(`getUserInfo (запроcить инф. пользователя)`);
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(this._checkAnswer);
  }

  changeUserInfo(user) {//изменить информацию пользователя
    // console.log(`changeUserInfo (изменить инф. пользователя)`);
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",//частичное обновление ресурса
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(user),
    })
    .then(this._checkAnswer);
  }

  savedMovieChange(film, id, isSaved) {//сохранить или удалить
    // console.log(`savedMovieChange (сохранить или удалить)`);
    if (isSaved) {//если сохранен. удалить
      return this._deleteMovie(id);
    } else {//или сохранить
      return this._saveMovie(film);
    }
  }

  _saveMovie(film) {//сохранить фильм
    // console.log(`saveMovie (сохранить фильм)`);
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",//полное обновление ресурса
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(film),
    })
      .then(this._checkAnswer);
  }

  _deleteMovie(id) {//удалить фильм 
    // console.log(`deleteMovie (удалить фильм) ${id}`);
    
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(this._checkAnswer);
  }

  signOut() { //выйти
    // console.log(`signOut (запроc для выхода)`);
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers,
			credentials: this._credentials,
    })
      .then(this._checkAnswer)
  }

  registration(data) {//запроc регистрации
    // console.log(`registration (запроc регистрации)`);
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
			credentials: this._credentials,
      body: JSON.stringify(data)
    })
    .then(this._checkAnswer)
  }

  authorization(data) {//запроc авторизации
    // console.log(`authorization (запроc авторизации)`);
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
			credentials: this._credentials,
      body: JSON.stringify(data)
    })
      .then(this._checkAnswer)
  }
}

//создадим api и передадим ему юрл сервера и код авторизации
export const mainApi = new MainApi({
  baseUrl: MAIN_DB_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	credentials: 'include',
});
