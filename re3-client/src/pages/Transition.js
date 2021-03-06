import React from 'react';
import Header from '../components/SimpleHeader';
import thinking from '../assets/img/undraw_thought_process_67my.svg';
import Next from '../components/NextButton';

const Transition = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />
      <div className="self-start text-4xl text-black flex text-left font-bold font-roboto py-8 px-10">
        Thank you for answering our questions
      </div>
      <div className="self-start text-3xl text-black flex text-left font-roboto py-0 px-16">
        Now you can proceed to enjoy our services 
      </div>
      <img alt="thinking" src={thinking} className="w-2/5 h-2/3 p-8" />
      <Next
      page = {'/homepage'}/>
    </div>
  );
};

export default Transition;
