import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => {
  const location = useLocation();
  //зарегистрированы и на стр. регистрации вернуть на предыдущую
  //не зарегистрированы и не на стр. регистрации вернуть на страницу регистрации
  //зарегистрированы и не на стр. регистрации отрисовать компонент  
  return (
  <Route>
    {() => 
      (props.loggedIn && props.pageAuth)  
        ? <Redirect to={ location.state || {pathname: '/' } }/>
        : (!props.loggedIn && !props.pageAuth) 
          ? <Redirect to='/' state={{ location }} />
          : <Component {...props} />
    }
  </Route>
  );
};

export default ProtectedRoute;