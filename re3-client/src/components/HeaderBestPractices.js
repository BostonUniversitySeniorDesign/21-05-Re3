import React from 'react';
import useRouter from '../utils/Router';
// import HomePage from '../pages/HomePage';
// import {
//     BrowserRouter as Router,
//     Route
//   } from 'react-router-dom';

const HomePageButton = () => {
  const router = useRouter();
  const page = async () => {
    router.push('/');
  };
  return (
    <div className="w-full bg-blue-500 flex flex-row justify-end relative py-4 px-10">
      <button
        href="/"
        onClick={() => page()}
        className="text-2xl font-robot text-white hover:text-black cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};
export default HomePageButton;
