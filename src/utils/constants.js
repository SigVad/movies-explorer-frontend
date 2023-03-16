// const MAIN_DB_URL = 'https://api.sigvad.nomoredomains.rocks'
const MAIN_DB_URL = 'http://127.0.0.1:3000'
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const IMAGES_URL = 'https://api.nomoreparties.co';

const SHORT_DURATION = 40;

const FILMS_DISPLAYED = {
    windowSize: {
      max: 1279,
      normal: 767,
      none: -1
    },
    quantityFilms: {
      max: 12,
      normal: 8,
      min: 5
    },
    onMoreFilms: {
      max: 3,
      normal: 2,
    }
};

const TIMEOUT_ONMESSAGE = 3000;
const TIMEOUT_ONRESIZE = 500;

export {
  MAIN_DB_URL,
  IMAGES_URL,
  MOVIES_URL,
  SHORT_DURATION,
  FILMS_DISPLAYED,
  TIMEOUT_ONMESSAGE,
  TIMEOUT_ONRESIZE
};