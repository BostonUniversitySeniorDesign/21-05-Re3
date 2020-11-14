import React from 'react';

const RatingNumberButton = ({ children, answer, setAnswer }) => {
  return (
    <button
      //"text-xl font-robot px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-md"
      className={`border-blue-400 hover:bg-blue-600 font-roboto rounded-md px-6 py-2 text-black border-2 text-xl mx-2 ${
        answer === children ? 'bg-blue-400' : 'bg-blue-300'
      }`}
      onClick={() => setAnswer(children)}
    >
      {children}
    </button>
  );
};

export default RatingNumberButton;
