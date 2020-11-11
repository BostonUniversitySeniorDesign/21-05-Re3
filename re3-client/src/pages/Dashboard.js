import React, { useState, useContext } from 'react';
import SignOutButton from '../components/SignOutButton';
import TestAddUser from '../components/TestButton';
import TestDownloadFile from '../components/TestDownloadFile';
import TestDisplayFile from '../components/TestDisplayFile';
import RatingNumberButton from '../components/RatingNumberButton';
import { AuthContext, FirebaseContext } from '../firebase';

const Dashboard = () => {
  const user = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const submit = () => {
    firebase.addSnippetRating(parseInt(currentAnswer));
  };
  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col items-center justify-center">
      <p className="text-2xl font-roboto text-center text-black mb-4">{`Signed in as ${user.displayName} 🚀`}</p>
      <SignOutButton />
      <br />
      <TestAddUser />
      <br />
      <TestDownloadFile />
      <br />
      <TestDisplayFile />
      <br />
      <div className="flex w-full items-center justify-center mb-6 space-x-1">
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          1
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          2
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          3
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          4
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          5
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          6
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        > 
          7
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          8
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          9
        </RatingNumberButton>
        <RatingNumberButton
          answer = {currentAnswer}
          setAnswer={setCurrentAnswer} 
        >
          10
        </RatingNumberButton>
      </div>
      <button
              className={`rounded-md text-white py-2 px-4 text-xl ${
                currentAnswer === '' ? 'bg-gray-400' : 'bg-blue-600'
              }`}
              onClick={() => submit()}
            >
              Submit Rating
        </button>
    </div>
  );
};

export default Dashboard;
