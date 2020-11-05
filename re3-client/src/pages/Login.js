import React from 'react';
// import Logo from '../components/Logo';
// import MyInput from '../components/MyInput';
//import Header from "../components/HomePageHeader"
import SignInButton from '../components/SignInButton';

import data from '../assets/img/data.svg';
import re3Logo from '../assets/img/LOGO3.png'

const Login = () => {
  // const name = 'Re3';

  return (
    <div>
    {/* <Header/> */}
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-200 py-16">
      
      {/* <Logo name={name} /> */}
      <img 
        alt ="re3Logo"
        src={re3Logo}
        className ="w-1/5 full justify-center items-center"/>
      {/* <MyInput /> */}
      <div className=" text-3xl text-black text-center flex flex-shrink font-hairline font-roboto">
        Reproducibility, Reusability, Readability
      </div>
      <div className="w-4/5 relative h-full flex flex-row justify-center items-center">
        <img
          alt="data"
          src={data}
          className="w-4/6 px-4 absolute flex-wrap left-0 pr-56"
        />
        <div className="w-1/2"></div>
        <div className="w-5/12 z-10 flex items-center justify-center">
          <SignInButton />
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Login;
