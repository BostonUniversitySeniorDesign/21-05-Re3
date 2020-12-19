import React from 'react';
import Header from '../components/SimpleHeader';
import thinking from '../assets/img/undraw_thought_process_67my.svg';

const Transition = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />
      <div className="self-start text-4xl text-black flex text-left font-bold font-roboto py-8 px-10">
        Thank you for answering..
      </div>
      <div className="self-start text-3xl text-black flex text-left font-roboto py-0 px-16">
        We will ask you to rate code snippets in a few seconds..
      </div>
      <img alt="thinking" src={thinking} className="w-1/2 h-2/3 p-8" />
    </div>
  );
};

export default Transition;
