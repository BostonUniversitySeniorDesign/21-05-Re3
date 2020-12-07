import React from 'react';

const RatingNumberButton = ({ children, submit}) => {
  return (
    <button
      className="border-blue-400 hover:bg-blue-600 font-roboto rounded-md px-6 py-2 text-black border-2 text-xl mx-2" 
      onClick={() => submit(children)}
    >
      {children}
    </button>
  );
};

export default RatingNumberButton;
