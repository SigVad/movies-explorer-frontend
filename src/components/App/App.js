// корневой компонент приложения, его создаёт CRA.
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useState, useEffect } from "react";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import { SHORT_DURATION, IMAGES_URL } from "../../utils/constants"
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from "../../utils/MoviesApi";

import Main from '../Main-components/Main/Main';
import Movies from '../Movies-components/Movies/Movies';
import SavedMovies from '../Movies-components/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';




function App(props) {
  // const textAuthStatusSuccess = 'Вы успешно \nзарегистрировались!';
  const textAuthStatusErrorDefault = `Что-то пошло не так! \nПопробуйте ещё раз.`;
  let textError = '';

  const [currentUser, setCurrentUser] = useState([]);
  
  const [loggedIn, setLoggedIn] = useState(false);//статус авторизации
  const [isLoading, setIsLoading] = useState(false);//на прелоадер

  const [filmsList, setFilmsList] = useState([]);//отображаемый массив фильмов
  const [films, setFilms] = useState([]);//массив фильмов
  const [searchText, setSearchText] = useState('');//поисковый запрос
  const [shortFilms, setShortFilms] = useState(false);//состояние чекбокса коротких

  const [savedFilmsList, setSavedFilmsList] = useState([]);//отображаемый массив фильмов из бд
  const [savedFilms, setSavedFilms] = useState([]);//массив фильмов из бд
  const [searchTextDb, setSearchTextDb] = useState('');//поисковый запрос из бд
  const [shortFilmsDb, setShortFilmsDb] = useState(false);//состояние чекбокса коротких из бд

  const [windowSize, setWindowSize] = useState(0);//размер экрана
  const [quantityFilms, setQuantityFilms] = useState(0); //выводимое количество фильмов
	const [onMoreFilms, setOnMoreFilms] = useState(0);
  
  // useEffect(() => {
	// 	handleQuantityFilms();
	// }, [windowSize])

	window.onresize = (() => {
		setTimeout(() => {
			setWindowSize(window.innerWidth);
			handleQuantityFilms();
		}, 500)
	})

  function handleQuantityFilms() {
		if (windowSize > 1279) {
			setQuantityFilms(12);
			setOnMoreFilms(3);
		// } else if (windowSize > 479) {
		} else if (windowSize > 767) {
			setQuantityFilms(8);
			setOnMoreFilms(2);
		} else {
			setQuantityFilms(5);
			setOnMoreFilms(2);
		}
	}

	useEffect(() => {
    setWindowSize(window.innerWidth);
    handleQuantityFilms()
		checkToken();
	}, [loggedIn, props.history]);

	useEffect(() => {
    putSearchTextToLocal(searchText);
    putShortFilmsToLocal(shortFilms);
    setFilmsList(searchFilter(films, searchText, shortFilms));
	}, [shortFilms, searchText]);

  useEffect(() => {
    setSavedFilmsList(searchFilter(savedFilms, searchTextDb, shortFilmsDb));
	}, [shortFilmsDb, searchTextDb]);

  function checkToken() { //проверка авторизации
		console.log('checkToken');
    mainApi.getUserInfo()
			.then((res) => {
				if (res) {
					setCurrentUser(res);
          setFilms(loadFilmsInLocal());
          setSearchText(loadSearchTextInLocal());
          setShortFilms(loadShortFilmsInLocal());
          setFilmsList(searchFilter(films, searchText, shortFilms));
          setSavedFilmsList(searchFilter(savedFilms, searchTextDb, shortFilmsDb));
					setLoggedIn(true);
          console.log(props.history.location.pathname);
					props.history.push(props.history.location.pathname);
          return res;
				}
			})
			.catch((err) => {
        const textError = `Не удалось получить данные пользователя.`;
        console.log(`${textError} ${err}`);
        setLoggedIn(false);
			})
	}

  function handleRegister(data) { //Зарегистрироваться
    mainApi.registration(data)
      .then((res) => {//и войти
        setLoggedIn(true);
        handleLogin({ email:data.email, password:data.password });
        return res;
      })
      .catch((err) => {
        switch (err) {
          case 400:
            textError = `Некорректно заполнено одно из полей ввода.`;
            break;
          default:
            textError = textAuthStatusErrorDefault;
        };
        console.log(`${textError} Ошибка ${err}`);
      })
  }

  function handleLogin(data) { //Войти
    mainApi.authorization(data)
    .then((res) => {
      props.history.push('/movies');
      setFilms(loadFilmsInLocal());
      setSearchText(loadSearchTextInLocal());
      setShortFilms(loadShortFilmsInLocal());
    })
    .catch((err) => {
      switch (err) {
        case 400:
          textError = `Не передано одно из полей ввода.`;
          break;
        case 401:
          textError = `Пользователь с этим Email не найден.`;
          break;
        default:
          textError = textAuthStatusErrorDefault;
      };
      console.log(`${textError} Ошибка ${err}`);
    })
  }

  function signout() { //Выйти
    mainApi.signOut()
      .then(() => {
        props.history.push('/');
        setLoggedIn(false);
    })
    .catch((err) => console.log(err));
  }

  //раздел для фильмов

  function loadFilms() { //загрузить фильмы
    // console.log('loadFilms');
		return moviesApi.getMovies()
			.then(list => { 
        const formatList = list.map((card)=>{
          return filmFormatToDb(card);
        })
        //загрузить фильмы в localStore
        localStorage.setItem('filmsList', JSON.stringify(formatList));
        setFilms(formatList);
      })
			.catch((err) => {
				console.log(err);
        setFilms([]);
			})
	}
  function loadFilmsDb() { //загрузить сохраненные фильмы
    console.log('loadFilmsDb');
		return mainApi.getMovies()
			.then(list => {
        console.log(list);
        setSavedFilms(list);
      })
			.catch((err) => {
				console.log(err);
        setSavedFilms([]);
			})
	}

  function loadFilmsInLocal() { //выгрузить фильмы из localStore
    const list = JSON.parse(
      localStorage.getItem('filmsList')
    );
    console.log(`loadFilmsInLocal`);
    return (list) 
      ? (list)
      : ([]);
  }

  function putSearchTextToLocal(text) { //загрузить поисковый запрос в localStore
    // console.log(`putSearchTextToLocal ${text}`);
    localStorage.setItem('searchText', JSON.stringify(text));
	}
  function loadSearchTextInLocal() { //выгрузить поисковый запрос из localStore
		const text = JSON.parse(
      localStorage.getItem('searchText')
    );
    // console.log(`loadSearchTextInLocal ${text}`);
    return (text) 
      ? (text)
      : ('');
	}

  function putShortFilmsToLocal(short) { //загрузить состояние чекбокса в localStore
    localStorage.setItem('shortFilms', JSON.stringify(short));
    // console.log(`putShortFilmsToLocal ${short}`);
	}
  function loadShortFilmsInLocal() { //выгрузить состояние чекбокса из localStore
		const short = JSON.parse(
      localStorage.getItem('shortFilms')
    );
    // console.log(`loadShortFilmsInLocal ${short}`);
    return (short) 
      ? (short)
      : (false);
	}


  function toggleShortFilms() { //переключить короткие на чекбокс
    // console.log(`toggleShortFilms`);
    setShortFilms(!shortFilms);
  }

  function toggleShortFilmsDb() { //переключить короткие на чекбокс
    // console.log(`toggleShortFilmsDb`);
    setShortFilmsDb(!shortFilmsDb);
  }

  function onSearch(text) { //Поиск
    // console.log('onSearch');
    loadFilms(); //перезагрузить фильмы
    setSearchText(text); //заменить текст для поиска
  }
  function onSearchDb(text) { //Поиск
    console.log('onSearchDb');
    loadFilmsDb(); //перезагрузить фильмы
    setSearchTextDb(text); //заменить текст для поиска
  }

  function searchFilter(list, text, short) { //фильтр текста на Поиск
    // console.log('searchFilter');
    return shortFilter(list, short).filter((film)=>{
      return film
        .nameRU
        .toLowerCase()
        .indexOf(text.toLowerCase()) !== -1;
    });
  }

  function shortFilter(list, short) { //фильтр текста на короткие
    // console.log('shortFilter');
    return short //если короткие, фильтровать
    ? list.filter((film)=>{
        return film.duration <= SHORT_DURATION;
      })
    : list;
  }

  function toggleSavedFilm(film) { //если нажать на Сохранить/Удалить
    // console.log('toggleSavedFilm');
		const isSaved = filmIsSaved(film.movieId);
    console.log(`isSaved ${isSaved}`);

    mainApi.savedMovieChange(film, isSaved)//Сохранить или Удалить
      .then((res) => {
        console.log(res);
        loadFilmsDb();
      })
      .catch((err) => {
        console.log(err);
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
    console.log(`onMoreFilmsClick ${quantityFilms}`);
  }

  function filmIsSaved(id) { //проверка на наличие фильма в бд
    // console.log('filmIsSaved');
    // console.log(savedFilms);
    return savedFilms.some(item => 
      (item.movieId === id)
    );
  }

  return (
		<CurrentUserContext.Provider value={currentUser} >
    <div className='page'>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn}/>
        </Route>
        <ProtectedRoute
          path="/movies"
          
          component={Movies}
          loggedIn={true}//useState статус авторизации
          isLoading={isLoading} //useState на прелоадер
          shortFilms = {shortFilms} //useState состояние чекбокса
          toggleShortFilms = {toggleShortFilms}//действие на чекбокс
          onSearch = {onSearch}//Поиск
          searchText = {searchText} //useState текст для фильтра
          filmsList = {filmsList} //useState фильмы movies из setFilms
          quantityFilms = {quantityFilms} //useState выводимое количество фильмов
          toggleSavedFilm = {toggleSavedFilm}//если нажать на Сохранить/Удалить
          savedFilms = {savedFilms}//useState из бд
          filmIsSaved = {filmIsSaved}//проверка на наличие фильма в бд
          onMoreFilmsClick = {onMoreFilmsClick}//если нажать на Ещё
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loadFilmsDb={loadFilmsDb}
          loggedIn={loggedIn}//useState статус авторизации
          isLoading={isLoading} //useState на прелоадер
          shortFilmsDb = {shortFilmsDb} //useState состояние чекбокса
          toggleShortFilmsDb = {toggleShortFilmsDb}//действие на чекбокс
          onSearchDb = {onSearchDb}//Поиск
          searchTextDb = {searchTextDb} //useState текст для фильтра
          savedFilmsList = {savedFilmsList} //useState фильмы movies из setFilms
          quantityFilms = {quantityFilms} //useState выводимое количество фильмов
          toggleSavedFilm = {toggleSavedFilm}//если нажать на Сохранить/Удалить
          savedFilms = {savedFilms}//useState из бд
          filmIsSaved = {filmIsSaved}//проверка на наличие фильма в бд
          onMoreFilmsClick = {onMoreFilmsClick}//если нажать на Ещё
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          signout={signout}
        />
        <Route path="/signin">
          <Login
            onLogin={handleLogin}
            loggedIn={loggedIn}
          />
        </Route>
        <Route path="/signup">
          <Register 
            onRegister={handleRegister} 
            loggedIn={loggedIn}
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </ div>
		</CurrentUserContext.Provider>
  );
}
  
export default withRouter(App);