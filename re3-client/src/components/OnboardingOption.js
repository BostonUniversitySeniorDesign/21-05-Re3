import React from 'react';

const OnboardingOption = ({ children, answer, setAnswer }) => {
  return (
    <button
      className={`border-blue-500 rounded-md w-1/2 py-4 text-black border-2 opacity-75 text-xl ${
        answer === children ? 'bg-blue-500' : 'bg-blue-300'
      }`}
      onClick={() => setAnswer(children)}
    >
      {children}
    </button>
  );
};

export default OnboardingOption;
