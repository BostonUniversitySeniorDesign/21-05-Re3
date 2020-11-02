import React, { useState, createContext } from 'react';
import { withFirebase } from './context';

const AuthContext = createContext(null);

export const AuthProvider = withFirebase(({ children, firebase }) => {
  const [user, setUser] = useState(null);

  firebase.authSubscriber(function (update) {
    setUser(update);
  });

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
});

export default AuthContext;
