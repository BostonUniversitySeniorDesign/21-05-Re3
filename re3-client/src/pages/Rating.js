import React, { useState, useContext, useEffect} from 'react';
import RatingNumberButton from '../components/RatingNumberButton';
import TestDisplayFile from '../components/TestDisplayFile';
import Header from '../components/RatingHeader';
import HappyFace from '../assets/img/undraw_feeling_happy_jymo.svg';
import SadFace from '../assets/img/undraw_feeling_blue_4b7q.svg';
import { FirebaseContext } from '../firebase';
import ProgressBar from '../components/ProgressBar';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import {AiFillQuestionCircle,AiFillCloseCircle } from 'react-icons/ai';


const Rating = () => {
  const firebase = useContext(FirebaseContext);
  const [fileContents, setFileContents] = useState('');
  const [completed, setCompleted] = useState(null);
  const [visible, setVisible] = useState(false);
  
  

  const closing = (e)  => {
    e.preventDefault();
    firebase.closingPage();
    e.returnValue = '';
    return e;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', closing );
    return () => {
      window.removeEventListener('beforeunload', closing);
    };
  });

  

  useEffect(() => {
    async function firstCall(){
      await firebase.getUserData().then((res) => {
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
    <div className="w-full relative min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <div className={`absolute w-full h-full z-20 items-center justify-center ${visible ? 'flex' : 'hidden'}`}>
           <div className="w-3/4 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center">
             <button onClick={() => setVisible(false)} className="text-3xl self-end text-blue-600">
               <AiFillCloseCircle/>
             </button>
             <p className="text-2xl">
           Please score this code snippet according to your estimation of readability. Give a low score for low readability and a high score for high readability. Readability is your judgment about how easy a block of code is to understand
            </p>
        </div>
        </div>
        <div className={`absolute w-full h-full bg-black z-10 opacity-25 ${visible ? 'flex' : 'hidden'}`} />
      <Header />
      <div className="w-full flex flex-row justify-center items-center">
        <div className="w-1/8"/>
        <div className="w-3/4 text-4xl text-black text-center flexfont-hairline font-roboto py-6">
        How would you rate the readability of this code?
      </div>
      <div className="w-1/8">
        <button
              className="transition duration-500 ease-in-out transform hover:scale-125 text-6xl text-blue-600"
              onClick={() => setVisible(!visible)}> 
              <AiFillQuestionCircle />
        </button>
      </div>
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
