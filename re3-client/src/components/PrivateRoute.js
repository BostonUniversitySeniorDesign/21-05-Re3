import React, { useState, useEffect, useContext } from 'react';
import Loading from '../pages/Loading';
import Onboarding from '../pages/Onboarding';
import { Redirect, Route } from 'react-router';
import { AuthContext, FirebaseContext } from '../firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const firebase = useContext(FirebaseContext);
  const [isOnboarded, setIsOnboarded] = useState(false);
  useEffect(() => {
    const setOnboarded = async () => {
      const isOnboarded = await firebase.isOnboarded();
      setIsOnboarded(isOnboarded);
    };
    setOnboarded();
  });

  setTimeout(() => {
    setInitializing(false);
  }, 3000);

  if (initializing && !isOnboarded) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          isOnboarded ? (
            <Component {...props} />
          ) : (
            <Onboarding />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
