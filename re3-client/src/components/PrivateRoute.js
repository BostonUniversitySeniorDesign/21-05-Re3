import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
