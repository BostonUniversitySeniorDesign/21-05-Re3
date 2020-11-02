import React from 'react';
import Logo from '../components/Logo';
import MyInput from '../components/MyInput';
import SignInButton from '../components/SignInButton';

import data from '../assets/img/data.svg';

const Login = () => {
  const name = 'Re3';

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-200 py-16">
      <Logo name={name} />
      <MyInput />
      <div className="w-4/5 relative h-full flex flex-row justify-center items-center">
        <img
          alt="data"
          src={data}
          className="w-4/6 px-4 absolute left-0 pr-56"
        />
        <div className="w-1/2"></div>
        <div className="w-5/12 z-10 flex items-center justify-center">
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
