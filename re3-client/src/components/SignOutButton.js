import React, { useContext } from 'react';
import { FirebaseContext } from '../firebase';

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);
  const signout = async () => {
    firebase.signOut();
  };
  return (
    <button
      onClick={() => signout()}
      className="text-2xl font-robot text-white hover:text-black cursor-pointer rounded-md focus:outline-none" >
      Sign out
    </button>
  );
};

export default SignOutButton;
