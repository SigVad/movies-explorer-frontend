import { MOVIES_URL } from './constants.js';

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  
  _checkAnswer = (res) => {//проверить ответ
    if (res.ok) {
      return res.json();
    }
    console.log(`Ошибка ${res.status}`);
    return Promise.reject(`Ошибка ${res.status}`);
  }
  
  getMovies() { // запросить список фильмов
    // console.log(`getMovies (запросить список фильмов)`);
    return fetch(this._baseUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkAnswer);
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
  headers: {
    "Content-Type": "application/json",
  }
});
