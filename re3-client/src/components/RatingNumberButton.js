import React from 'react';

const RatingNumberButton = ({ children, answer, setAnswer }) => {
  return (
    <button
    //"text-xl font-robot px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-md"
      className={`border-blue-500 fonr-robot rounded-md px-8 py-4 text-black border-2 opacity-75 text-xl ${
        answer === children ? 'bg-blue-500' : 'bg-blue-300'
      }`}
      onClick={() => setAnswer(children)}
    >
      {children}
    </button>
  );
};

export default RatingNumberButton;