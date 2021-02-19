import React, { useContext } from 'react';
import { FirebaseContext } from '../firebase';

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);
  const signout = async () => {
    console.log("pressed");
    firebase.signOut();
  };
  return (
    <button
      onClick={() => signout()}
      className="text-2xl font-robot text-white hover:text-black cursor-pointer rounded-md" >
      Sign out
    </button>
  );
};

export default SignOutButton;
