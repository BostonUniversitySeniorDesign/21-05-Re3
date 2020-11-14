import React, { useState } from 'react';
import RatingNumberButton from '../components/RatingNumberButton';
import TestDisplayFile from '../components/TestDisplayFile';
import Header from '../components/RatingHeader';
import HappyFace from '../assets/img/undraw_feeling_happy_jymo.svg';
import SadFace from '../assets/img/undraw_feeling_blue_4b7q.svg';

const Rating = () => {
  const [currentAnswer, setCurrentAnswer] = useState('');
  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />
      <div className="self-start text-4xl text-black flex text-left font-hairline font-roboto py-6 px-10">
        How would you rate the readability of this code?
      </div>
      <TestDisplayFile />
      <div className="flex flex-row items-center justify-center">
        <img alt="SadFace" src={SadFace} className="w-1/6 p-4" />

        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          1
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          2
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          3
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          4
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          5
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          6
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          7
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          8
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          9
        </RatingNumberButton>
        <RatingNumberButton answer={currentAnswer} setAnswer={setCurrentAnswer}>
          10
        </RatingNumberButton>
        <img alt="HappyFace" src={HappyFace} className="w-1/6 p-4" />
      </div>
    </div>
  );
};

export default Rating;
