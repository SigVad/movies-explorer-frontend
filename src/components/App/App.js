// корневой компонент приложения, его создаёт CRA.
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useState, useEffect } from "react";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import { 
  SHORT_DURATION, 
  IMAGES_URL, 
  FILMS_DISPLAYED,
  TIMEOUT_ONMESSAGE,
  TIMEOUT_ONRESIZE
} from '../../utils/constants';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from "../../utils/MoviesApi";

import Main from '../Main-components/Main/Main';
import Movies from '../Movies-components/Movies/Movies';
import SavedMovies from '../Movies-components/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import StatusPopup from '../StatusPopup/StatusPopup';

function App(props) {
  const textAuthStatusErrorDefault = `Во время запроса произошла ошибка. 
  Возможно, проблема с соединением или сервер недоступен.`;
  const [textError, setTextError] = useState(""); //ошибка сервера
  const [message, setMessage] = useState(""); //уведомление

  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);//на прелоадер
  const [filmsList, setFilmsList] = useState([]);//отображаемый массив фильмов
  const [films, setFilms] = useState([]);//массив фильмов
  const [searchText, setSearchText] = useState('');//поисковый запрос
  const [shortFilms, setShortFilms] = useState(false);//состояние чекбокса коротких
  const [savedFilms, setSavedFilms] = useState([]);//массив фильмов из бд
  const [loggedIn, setLoggedIn] = useState(false);//статус авторизации
  const [savedFilmsList, setSavedFilmsList] = useState([]);//отображаемый массив фильмов из бд
  const [searchTextDb, setSearchTextDb] = useState('');//поисковый запрос из бд
  const [shortFilmsDb, setShortFilmsDb] = useState(false);//состояние чекбокса коротких из бд
  const [windowSize, setWindowSize] = useState(-1);//размер экрана
  const [quantityFilms, setQuantityFilms] = useState(0); //выводимое количество фильмов
  const [onMoreFilms, setOnMoreFilms] = useState(0);
  
  const [statusPopup, setStatusPopup] = useState(false); // попап статуса

  useEffect(() => {
    // console.log('первый юз');
    checkToken();
  }, []);

  useEffect(() => {
    // console.log('юз на логгед');
    let lokation = props.history.location.pathname;
    if((!loggedIn)&&((lokation === '/movies') || (lokation === '/saved-movies'))) {
      setFilms(loadFilmsInLocal());
      loadFilmsDb();
      setSearchText(loadSearchTextInLocal());
      setShortFilms(loadShortFilmsInLocal());
      resetLocation();}
  }, [loggedIn]);

	useEffect(() => {
    // console.log('юз на историю');
		handleQuantityFilms();
    let location = props.history.location.pathname;
    location !== '/' && putLocationToLocal(location);
    if ((props.history.location.pathname === '/movies') && (films !== [])) 
    { handleFiltredFilms() };
    if ((props.history.location.pathname === '/saved-movies') && (savedFilms !== [])) 
    { handleFiltredSavedFilms() };
	}, [ props.history.location.key ])
  
  window.onresize = (() => { //обновлять ширину экрана каждую секунду
    setTimeout(() => {
      setWindowSize(window.innerWidth);
      handleQuantityFilms();
    }, TIMEOUT_ONRESIZE)
  })

	function checkToken() {//готов проверить статус авторизацмм
		mainApi.getUserInfo()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
          props.history.push(loadLocationInLocal());
        }
      })
      .catch((err) => {
        props.history.push('/');
        setLoggedIn(false);
      });
	}

  function handleFiltredFilms() {
    // console.log('обновление списка фильмов');
      if (searchText !== '') {
      setFilmsList(() => searchFilter(films, searchText, shortFilms));
      }
  }

  function handleFiltredSavedFilms() {
    // console.log('обновление списка сохраненных фильмов');
      setSavedFilmsList(() => searchFilter(savedFilms, searchTextDb, shortFilmsDb));
  }

  function resetLocation(){
    props.history.push(props.history.location.pathname);
  }

  function handleQuantityFilms() {
    let size = windowSize;
    if (size === FILMS_DISPLAYED.windowSize.none) { // -1
      size = window.innerWidth;
      setWindowSize(size);
    };
    if (size > FILMS_DISPLAYED.windowSize.max) {  // 1279
      setQuantityFilms(FILMS_DISPLAYED.quantityFilms.max); // 12
      setOnMoreFilms(FILMS_DISPLAYED.onMoreFilms.max); // 3
    } else if (size > FILMS_DISPLAYED.windowSize.normal) {  // 767
      setQuantityFilms(FILMS_DISPLAYED.quantityFilms.normal); // 8
      setOnMoreFilms(FILMS_DISPLAYED.onMoreFilms.normal); // 2
    } else {
      setQuantityFilms(FILMS_DISPLAYED.quantityFilms.min); // 5
      setOnMoreFilms(FILMS_DISPLAYED.onMoreFilms.normal); // 2
    }
  }

  function onMessageTimeout(text){
    setMessage(text)
    setStatusPopup(true);
    setTimeout(() => {
      setMessage('');
      setStatusPopup(false);
    }, TIMEOUT_ONMESSAGE);
  }

  function onTextErrorTimeout(text){
    setStatusPopup(true);
    setTextError(text);
    setTimeout(() => {
      setTextError('');
      setStatusPopup(false);
    }, TIMEOUT_ONMESSAGE);
  }
  function handleRegister(data) { //Зарегистрироваться
    setIsLoading(true);
    mainApi.registration(data)
      .then((res) => {//и войти
        onMessageTimeout('Вы успешно \nзарегистрировались!');
        handleLogin({ email:data.email, password:data.password });
        return res;
      })
      .catch((err) => {
        let text = '';
        switch (err) {
          case 'Ошибка 409':
            text = `Пользователь уже существует`;
            break;
          case 'Ошибка 400':
            text = `Некорректно заполнено одно из полей ввода`;
          break;
          default:
            text = textAuthStatusErrorDefault;
        };
        onTextErrorTimeout(text);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(data) { //Войти
    setIsLoading(true);
    mainApi.authorization(data)
    .then((res) => {
      setLoggedIn(true);
      onMessageTimeout('Добро пожаловать!');
      saveUserInfo();
      loadFilms();
      loadFilmsDb();
      props.history.push('/movies');
    })
    .catch((err) => {
      let text = '';
      switch (err) {
        case 'Ошибка 400':
          text = `Не передано одно из полей ввода.`;
          break;
        case 'Ошибка 401':
          text = `Пользователь с этим Email не найден.`;
          break;
        default:
          text = textAuthStatusErrorDefault;
      };
      onTextErrorTimeout(text);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  function saveUserInfo() {
    setIsLoading(true);
     mainApi.getUserInfo()
       .then((res) => {
         if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
          return res;
        }
      })
      .catch((err) => {
        const textError = `Не удалось получить данные пользователя.`;
        onTextErrorTimeout(textError);
        setLoggedIn(false);
        signOut();
       })
       .finally(() => {
         setIsLoading(false);
       });
  }
  function handleChangeUserInfo(user) {
    setIsLoading(true);
    mainApi
      .changeUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        // localStorage.setItem("email", res.email);
        // localStorage.setItem("name", res.name);
        onMessageTimeout("Данные успешно обновлены");
      })
      .catch((err) => {
        let text = '';
        switch (err) {
          case 'Ошибка 409':
            text = `Пользователь c таким Email уже существует`;
            break;
          case 'Ошибка 400':
            text = `Некорректно заполнено одно из полей ввода`;
          break;
          default:
            text = textAuthStatusErrorDefault;
        };
        onTextErrorTimeout(text);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function signOut() { //Выйти
    setIsLoading(true);
    mainApi.signOut()
      .then(() => {
        setCurrentUser([]);
        setFilmsList([]);//отображаемый массив фильмов
        setFilms([]);//массив фильмов
        setSearchText('');//поисковый запрос
        setShortFilms(false);//состояние чекбокса коротких
        setSavedFilms([]);//массив фильмов из бд
        setLoggedIn(false);//статус авторизации
        setSavedFilmsList([]);//отображаемый массив фильмов из бд
        setSearchTextDb('');//поисковый запрос из бд
        localStorage.removeItem('isLocation');
        localStorage.removeItem('searchText');
        localStorage.removeItem('shortFilms');
        localStorage.removeItem('filmsList');
        localStorage.removeItem('savedFilms');
        onMessageTimeout('Приходите ещё!');
        props.history.push("/");
    })
    .catch((err) => {
      onTextErrorTimeout('Произошла ошибка. Повторите запрос.');
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  //раздел для фильмов
  function loadFilms() { //загрузить фильмы
    setIsLoading(true);
    return moviesApi.getMovies()
      .then(list => {
        const formatList = list.map((item)=>{
          return filmFormatToDb(item);
        })
        //загрузить фильмы в localStore
        localStorage.setItem('filmsList', JSON.stringify(formatList));
        setFilms(formatList);
        return (formatList);
      })
      .catch((err) => {
        onTextErrorTimeout(textAuthStatusErrorDefault);
        setFilms([]);
        return ([]);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }
  function loadFilmsDb() { //загрузить сохраненные фильмы
    setIsLoading(true);
    return mainApi.getMovies()
      .then(list => {
        setSavedFilms(list);
      })
      .catch((err) => {
        onTextErrorTimeout(textAuthStatusErrorDefault);
        setSavedFilms([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function loadFilmsInLocal() { //выгрузить фильмы из localStore
    const films = JSON.parse(
      localStorage.getItem('filmsList')
    );
    return (films)
      ? (films)
      : loggedIn 
        ? loadFilms()
        : ([]);
  }
 
  function putSearchTextToLocal(text) { //загрузить поисковый запрос в localStore
    localStorage.setItem('searchText', JSON.stringify(text));
  }

  function loadSearchTextInLocal() { //выгрузить поисковый запрос из localStore
    const text = JSON.parse(
      localStorage.getItem('searchText')
    );
    return (text)
      ? (text)
      : ('');
  }
  function putLocationToLocal(status) { //загрузить локацию и в localStore
    localStorage.setItem('isLocation', JSON.stringify(status));
  }

  function loadLocationInLocal() { //выгрузить локацию из localStore
    const status = JSON.parse(
      localStorage.getItem('isLocation')
    );
    return (status) 
      ? (status)
      : ('/');
  }

  function putShortFilmsToLocal(short) { //загрузить состояние чекбокса в localStore
    localStorage.setItem('shortFilms', JSON.stringify(short));
  }

  function loadShortFilmsInLocal() { //выгрузить состояние чекбокса из localStore
    const short = JSON.parse(
      localStorage.getItem('shortFilms')
    );
    return (short) 
      ? (short)
      : (false);
  }
  
  function toggleShortFilms() { //переключить на чекбокс
    setIsLoading(true);
    putShortFilmsToLocal(!shortFilms);
    setShortFilms(!shortFilms);
    handleFiltredFilms();
    resetLocation();
    setIsLoading(false);
  }

  function toggleShortFilmsDb() { //переключить короткие на чекбокс
    setIsLoading(true);
    setShortFilmsDb(!shortFilmsDb);
    handleFiltredSavedFilms();
    resetLocation();
    setIsLoading(false);
  }

  function onSearch(text) { //Поиск
    if (text==='') { 
      onTextErrorTimeout("Нужно ввести ключевое слово")
    }
    else {
      setIsLoading(true);
      putSearchTextToLocal(text);
      setSearchText(text); //заменить текст для поиска
      handleFiltredFilms();
      resetLocation();
      setIsLoading(false);
    }
  }

  function onSearchDb(text) { //Поиск
    setIsLoading(true);
    setSearchTextDb(text); //заменить текст для поиска
    handleFiltredSavedFilms();
    resetLocation();
    setIsLoading(false);
  }

  function searchFilter(list, text, short) { //фильтр текста на Поиск
    const filtredList = shortFilter(list, short).filter(
      (film)=>
        film.nameRU.toLowerCase().indexOf(text.toLowerCase()) !== -1
      )
    filtredList.length !== 0
      ? onMessageTimeout("")
      : onTextErrorTimeout("Ничего не найдено");
    return filtredList;
  }

  function shortFilter(list, short) { //фильтр текста на короткие
    return short //если короткие, фильтровать
    ? list.filter((film)=>{
        return film.duration <= SHORT_DURATION;
      })
    : list;
  }

  function toggleSavedFilm(film) { //если нажать на Сохранить/Удалить
    setIsLoading(true);
    let save = false;
    let id = inspectFilmIsSaved(film.movieId);
    id ? save = true : id = '';
    mainApi.savedMovieChange( //Сохранить или Удалить
      {
        nameRU: film.nameRU,
        nameEN: film.nameEN,
        director: film.director,
        country: film.country,
        year: film.year,
        duration: film.duration,
        description: film.description,
        trailerLink: film.trailerLink, 
        image: film.image, 
        thumbnail: film.thumbnail, 
        movieId: film.movieId
      }, id, save)
      .then((res) => {
        let messageText = '';
        if (save){
          setSavedFilms(((state) => savedFilms.filter((item)=>{
              return film.movieId !== item.movieId;
            })));
          messageText = `Фильм ${film.nameRU} удален`;
        } else {
          setSavedFilms(((state) => [...state, res]));
          messageText = `Фильм ${film.nameRU} сохранен`;
        }
        handleFiltredSavedFilms();
        handleFiltredFilms();
        resetLocation();
        onMessageTimeout(messageText);
      })
      .catch((err) => {
        onTextErrorTimeout(`${save ? 'Удалить': 'Сохранить'} фильм не удалось.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function filmFormatToDb(film) { //преобразовать для сохранения в БД
    return {
      nameRU: film.nameRU,
      nameEN: film.nameEN,
      director: film.director,
      country: film.country,
      year: film.year,
      duration: film.duration,
      description: film.description,
      trailerLink: film.trailerLink,
      image: `${IMAGES_URL}${film.image.url}`,
      thumbnail: `${IMAGES_URL}${film.image.formats.thumbnail.url}`,
      movieId: film.id,
    }
  }

  function onMoreFilmsClick() { //если нажать на Ещё
    setQuantityFilms(quantityFilms + onMoreFilms)
  }

  function inspectFilmIsSaved(movieId) { //проверка на наличие фильма в бд
    const rezFilm = savedFilms.find((item) => {
      return (item.movieId === movieId)
    });
    if (rezFilm) {
      return rezFilm._id;
    } else {
      return false;
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
    <div className='page'>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}//useState статус авторизации
          isLoading={isLoading} //useState на прелоадер
          shortFilms = {shortFilms} //useState состояние чекбокса
          toggleShortFilms = {toggleShortFilms}//действие на чекбокс
          onSearch = {onSearch}//Поиск
          searchText = {searchText} //useState текст для фильтра
          filmsList = {filmsList} //useState фильмы movies из setFilms
          quantityFilms = {quantityFilms} //useState выводимое количество фильмов
          toggleSavedFilm = {toggleSavedFilm}//если нажать на Сохранить/Удалить
          inspectFilmIsSaved = {inspectFilmIsSaved}//проверка на наличие фильма в бд
          onMoreFilmsClick = {onMoreFilmsClick}//если нажать на Ещё
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn = {loggedIn}//useState статус авторизации
          isLoading = {isLoading} //useState на прелоадер
          shortFilmsDb = {shortFilmsDb} //useState состояние чекбокса
          toggleShortFilmsDb = {toggleShortFilmsDb}//действие на чекбокс
          onSearchDb = {onSearchDb}//Поиск
          searchTextDb = {searchTextDb} //useState текст для фильтра
          savedFilmsList = {savedFilmsList} //useState фильмы movies из setFilms
          quantityFilms = {quantityFilms} //useState выводимое количество фильмов
          toggleSavedFilm = {toggleSavedFilm}//если нажать на Сохранить/Удалить
          inspectFilmIsSaved = {inspectFilmIsSaved}//проверка на наличие фильма в бд
          onMoreFilmsClick = {onMoreFilmsClick}//если нажать на Ещё
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          isLoading={isLoading}
          signOut={signOut}
          onChangeUserInfo={handleChangeUserInfo}
        />
        <Route path="/signin">
          <Login
            onLogin={handleLogin}
            loggedIn={loggedIn}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/signup">
          <Register
            onRegister={handleRegister} 
            loggedIn={loggedIn}
            isLoading={isLoading}
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <StatusPopup 
        textError={textError}
        message={message}
        isOpen={statusPopup}
      />
    </ div>
    </CurrentUserContext.Provider>
  );
}
  
export default withRouter(App);