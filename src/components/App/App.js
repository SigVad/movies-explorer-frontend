// корневой компонент приложения, его создаёт CRA.
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main-components/Main/Main';
import Movies from '../Movies-components/Movies/Movies';
import SavedMovies from '../Movies-components/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className='page'>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </ div>
  );
}
  
export default App;