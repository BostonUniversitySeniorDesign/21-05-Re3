import React, { useState, useContext, useEffect } from 'react';
import RatingNumberButton from '../components/RatingNumberButton';
import TestDisplayFile from '../components/TestDisplayFile';
import Header from '../components/RatingHeader';
import HappyFace from '../assets/img/undraw_feeling_happy_jymo.svg';
import SadFace from '../assets/img/undraw_feeling_blue_4b7q.svg';
import { FirebaseContext } from '../firebase';
import TestPrevSnippet from '../components/TestPrevSnippet';

const Rating = () => {
  const firebase = useContext(FirebaseContext);
  const [fileContents, setFileContents] = useState('');
  const [completed, setCompleted] = useState(null);

  useEffect(() => {
    firebase.DisplayContents().then((res) => {
      setFileContents(res);
    });
    firebase.getCurrentSnippetFirstTime().then((res) => {
      setCompleted(res)
    });
  }, [firebase]);

  const dispSnippet = () => {
    firebase.DisplayContents().then((res) => {
      setFileContents(res);
    });
  };

  const updateCompleted = () => {
    firebase.getCurrentSnippet().then((res) => {
      setCompleted(res);
    });
  }

  const submit = async (value) => {
    await firebase.addSnippetRating(parseInt(value));
    updateCompleted();
    dispSnippet();
  }
  
  const goBack = async () => {
    await firebase.decrementSnippetCounter();
    await dispSnippet();
    updateCompleted();
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />
      <div className="self-center text-4xl text-black flex text-left font-hairline font-roboto py-6 px-10">
        How would you rate the readability of this code?
      </div>
      <TestDisplayFile snippet={fileContents} />
      <div className="flex flex-row items-center justify-center">
        <img alt="SadFace" src={SadFace} className="w-1/6 p-4" />
        <TestPrevSnippet goBack={goBack} />
        <RatingNumberButton submit={submit}>1</RatingNumberButton>
        <RatingNumberButton submit={submit}>2</RatingNumberButton>
        <RatingNumberButton submit={submit}>3</RatingNumberButton>
        <RatingNumberButton submit={submit}>4</RatingNumberButton>
        <RatingNumberButton submit={submit}>5</RatingNumberButton>
        <RatingNumberButton submit={submit}>6</RatingNumberButton>
        <RatingNumberButton submit={submit}>7</RatingNumberButton>
        <RatingNumberButton submit={submit}>8</RatingNumberButton>
        <RatingNumberButton submit={submit}>9</RatingNumberButton>
        <RatingNumberButton submit={submit}>10</RatingNumberButton>
        <img alt="HappyFace" src={HappyFace} className="w-1/6 p-4" />
      </div>

      <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-l font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
            Task in progress
          </span>
        </div>
        <div className="text-right">
          <span className="text-l font-semibold inline-block text-blue-600">
            {completed}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-l flex rounded bg-blue-200">
        <div style={{ width : `${completed}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
      </div>
    </div>

    </div>
  );
};

export default Rating;
