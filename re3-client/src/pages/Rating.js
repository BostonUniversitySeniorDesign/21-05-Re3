import React, { useState, useContext, useEffect } from 'react';
import RatingNumberButton from '../components/RatingNumberButton';
import TestDisplayFile from '../components/TestDisplayFile';
import Header from '../components/RatingHeader';
import HappyFace from '../assets/img/undraw_feeling_happy_jymo.svg';
import SadFace from '../assets/img/undraw_feeling_blue_4b7q.svg';
import { FirebaseContext } from '../firebase';
import ProgressBar from '../components/ProgressBar';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const Rating = () => {
  const firebase = useContext(FirebaseContext);
  const [fileContents, setFileContents] = useState('');
  const [completed, setCompleted] = useState(null);

  const closing = (e) => {
    e.preventDefault();
    firebase.closingPage();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', closing);
    return () => {
      window.removeEventListener('beforeunload', closing);
    };
  });

  useEffect(() => {
    async function firstCall(){
      await firebase.getCurrentSnippetFirstTime().then((res) => {
        setCompleted(res);
      });
      firebase.DisplayContents().then((res) => {
        setFileContents(res);
      });
    }
    firstCall();
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
  };

  const submit = async (value) => {
    await firebase.addSnippetRating(parseInt(value));
    updateCompleted();
    dispSnippet();
  };

  const goBack = async () => {
    await firebase.decrementSnippetCounter();
    await dispSnippet();
    updateCompleted();
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />
      <div className="self-center text-4xl text-black flex text-left font-hairline font-roboto py-6 px-10">
        How would you rate the readability of this code?
      </div>
      <ProgressBar completed={completed} />
      <div className="w-full flex flex-row items-center justify-center">
        <div className="w-1/8 flex flex-col items-end justify-center pr-4">
          <button
            className="transition duration-500 ease-in-out transform hover:scale-125 text-6xl text-blue-600"
            onClick={() => goBack()}
          >
            <IoArrowBackCircleOutline />
          </button>
          <p className="text-l font-semibold text-blue-600 uppercase">
            Go Back
          </p>
        </div>
        <TestDisplayFile snippet={fileContents} />
        <div className="w-1/8 pl-2" />
      </div>
      <div className="flex flex-row items-center justify-center">
        <img alt="SadFace" src={SadFace} className="w-1/6 p-4" />
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
    </div>
  );
};

export default Rating;
