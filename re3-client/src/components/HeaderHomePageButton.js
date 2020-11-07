import React from 'react';
import useRouter from '../utils/Router';
// import HomePage from '../pages/HomePage';
// import {
//     BrowserRouter as Router,
//     Route
//   } from 'react-router-dom';

const HomePageButton = () => {
    const router =useRouter();
    const page = async() => {
        router.push('/homepage');
    }
    return(
        <div>
        <button
        href ="/homepage"
        onClick ={() => page()}
        className="text-xl font-robot text-white hover:text-black cursor-pointer mx-6">
           Home  
        </button>
        </div>
    );
};
export default HomePageButton;