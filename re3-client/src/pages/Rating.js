import React, { useState, useContext, useEffect } from 'react';
import RatingNumberButton from '../components/RatingNumberButton';
import TestDisplayFile from '../components/TestDisplayFile';
import Header from '../components/RatingHeader';
import HappyFace from '../assets/img/undraw_feeling_happy_jymo.svg';
import SadFace from '../assets/img/undraw_feeling_blue_4b7q.svg';
import { FirebaseContext } from '../firebase';

const Rating = () => {
  const firebase = useContext(FirebaseContext);
  const [fileContents, setFileContents] = useState('');

  useEffect(() => {
    firebase.DisplayContents().then((res) => {
      setFileContents(res);
    });
  }, [firebase]);

  const nextSnippet = () => {
    firebase.DisplayContents().then((res) => {
      setFileContents(res);
    });
  };

  const submit = (value) => {
    firebase.addSnippetRating(parseInt(value));
    nextSnippet();
  };
  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />
      <div className="self-start text-4xl text-black flex text-left font-hairline font-roboto py-6 px-10">
        How would you rate the readability of this code?
      </div>
      <TestDisplayFile snippet={fileContents} />
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
