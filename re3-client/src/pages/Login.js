import React from 'react';
import SignInButton from '../components/SignInButton';

import data from '../assets/img/data.svg';

const Login = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-200 py-16">
      <p className="text-6xl font-roboto text-black font-semibold">Re3</p>
      <p className="text-3xl font-roboto text-black">
        Reproducibility, Reusability, Readability
      </p>
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
