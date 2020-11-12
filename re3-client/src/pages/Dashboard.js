import React, { useState, useContext, useEffect } from 'react';
import SignOutButton from '../components/SignOutButton';
import TestAddUser from '../components/TestButton';
import TestDownloadFile from '../components/TestDownloadFile';
import TestDisplayFile from '../components/TestDisplayFile';
import RatingNumberButton from '../components/RatingNumberButton';
import { AuthContext, FirebaseContext } from '../firebase';

const Dashboard = () => {
  const user = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);
  const [fileContents, setFileContents] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  useEffect(() => {
    firebase.DisplayContents().then((res) => {
      setFileContents(res);
    });
  }, [])

  const nextSnippet = () => {
    firebase.DisplayContents().then((res) => {
      setFileContents(res);
    });
  }

  const submit = (value) => {
    firebase.addSnippetRating(parseInt(value));
    nextSnippet();
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
      <TestDisplayFile snippet={fileContents} />
      <br />
      <div className="flex w-full items-center justify-center mb-6 space-x-1">
        <RatingNumberButton
          submit={submit} 
        >
          1
        </RatingNumberButton>
        <RatingNumberButton
          submit={submit}
        >
          2
        </RatingNumberButton>
        <RatingNumberButton
          submit={submit}
        >
          3
        </RatingNumberButton>
        <RatingNumberButton
          submit={submit}
        >
          4
        </RatingNumberButton>
        <RatingNumberButton
          submit={submit}
        >
          5
        </RatingNumberButton>
        <RatingNumberButton
          submit={submit}
        >
          6
        </RatingNumberButton>
        <RatingNumberButton
          submit={submit} 
        > 
          7
        </RatingNumberButton>
        <RatingNumberButton
         submit={submit}
        >
          8
        </RatingNumberButton>
        <RatingNumberButton
          submit={submit} 
        >
          9
        </RatingNumberButton>
        <RatingNumberButton
          submit={submit} 
        >
          10
        </RatingNumberButton>
      </div>
    </div>
  );
};

export default Dashboard;
