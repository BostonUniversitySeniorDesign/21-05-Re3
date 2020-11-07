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
      className="text-xl font-robot px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-md" >
      Sign out
    </button>
  );
};

export default SignOutButton;
