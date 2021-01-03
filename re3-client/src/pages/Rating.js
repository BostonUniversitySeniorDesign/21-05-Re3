import React, { useState, useContext, useEffect, useRef } from 'react';
import RatingNumberButton from '../components/RatingNumberButton';
import TestDisplayFile from '../components/TestDisplayFile';
import Header from '../components/RatingHeader';
import HappyFace from '../assets/img/undraw_joyride_hnno.svg';
import SadFace from '../assets/img/undraw_feeling_blue_4b7q.svg';
import { FirebaseContext, AuthContext } from '../firebase';
import ProgressBar from '../components/ProgressBar';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline
} from 'react-icons/io5';
import { AiFillQuestionCircle, AiFillCloseCircle } from 'react-icons/ai';
import socketIOClient from 'socket.io-client';
import useRouter from '../utils/Router';

const ENDPOINT = 'https://re3-server.uc.r.appspot.com/';

const Rating = () => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(AuthContext);
  const [fileContents, setFileContents] = useState('');
  const [completed, setCompleted] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dis, setDis] = useState(false);

  let socket = useRef(null);

  const router = useRouter();

  useEffect(() => {
    user.getIdToken(true).then((idToken) => {
      socket.current = socketIOClient(ENDPOINT, { query: { token: idToken } });
      socket.current.emit('initSnippet', firebase.currentSnippet);
    });
    return () => {
      console.log('yuuuhhhppp');
      socket.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function firstCall() {
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
      setDis(false);
    });
  };

  const updateCompleted = () => {
    firebase.getCurrentSnippet().then((res) => {
      setCompleted(res);
    });
  };

  const submit = async (value) => {
    let currentSnippet = firebase.currentSnippet;
    socket.current.emit('rating', {
      snippetNumber: currentSnippet,
      rating: value
    });
    setDis(true);
    await firebase.addSnippetRating(parseInt(value));
    if (firebase.currentSnippet === 100) {
      router.push('/thanksagain')
    }
    updateCompleted();
    dispSnippet();
  };

  const goBack = async () => {
    await firebase.decrementSnippetCounter();
    await dispSnippet();
    updateCompleted();
  };

  const skip = async (value) => {
    setDis(true);
    await firebase.addSnippetRating(0);
    updateCompleted();
    dispSnippet();
  };

  return (
    <div className="w-full relative min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <div
        className={`absolute w-full h-full z-20 items-center justify-center ${
          visible ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-3/4 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center">
          <button
            onClick={() => setVisible(false)}
            className="text-3xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          <p className="text-2xl">
            Please score this code snippet according to your estimation of
            readability. Give a low score for low readability and a high score
            for high readability. Readability is your judgment about how easy a
            block of code is to understand
          </p>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-10 opacity-25 ${
          visible ? 'flex' : 'hidden'
        }`}
      />
      <Header />
      <div className="w-full flex flex-row justify-center items-center">
        <div className="w-1/8" />
        <div className="w-3/4 text-4xl text-black text-center flexfont-hairline font-roboto py-6">
          How would you rate the readability of this code?
        </div>
        <div className="w-1/8">
          <button
            className="transition duration-500 ease-in-out transform hover:scale-125 text-6xl text-blue-600"
            onClick={() => setVisible(!visible)}
          >
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
        <div className = "flex flex-col items-center items-end">
        <button
          className="transition duration-500 ease-in-out transform hover:scale-125 text-6xl text-blue-600" 
          onClick={() => skip() }>
          <IoArrowForwardCircleOutline />
        </button>
        <p className="text-l font-semibold text-blue-600 uppercase">
          Skip
        </p>
        </div>


        <div className="w-1/8 pl-2" />
      </div>
      <div className="flex flex-row items-center justify-center">
        <img alt="SadFace" src={SadFace} className="w-1/6 p-4" />
        <RatingNumberButton submit={submit} dis={dis}>
          1
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          2
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          3
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          4
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          5
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          6
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          7
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          8
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          9
        </RatingNumberButton>
        <RatingNumberButton submit={submit} dis={dis}>
          10
        </RatingNumberButton>
        <img alt="HappyFace" src={HappyFace} className="w-1/6 p-4" />
      </div>
    </div>
  );
};

export default Rating;
