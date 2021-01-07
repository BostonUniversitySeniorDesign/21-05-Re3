import React from 'react';

const RatingNumberButton = ({ children, submit, dis}) => {
  return (
    <button
      className={`font-roboto rounded-md px-6 py-2 text-black border-2 text-xl mx-2 ${
        dis === true ? 'bg-gray-500' : 'bg-blue-300 hover:bg-blue-600 border-blue-400'
      }`}
      disabled={dis}
      onClick={() => submit(children)}
    >
      {children}
    </button>
  );
};

export default RatingNumberButton;
