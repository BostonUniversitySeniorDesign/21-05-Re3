import React, { useContext } from 'react';
import GoogleButton from 'react-google-button';
import { FirebaseContext } from '../firebase';

const SignInButton = () => {
  const firebase = useContext(FirebaseContext);
  const login = async () => {
    await firebase.googleSignIn();
  };
  return <GoogleButton onClick={() => login()} />;
};

export default SignInButton;
