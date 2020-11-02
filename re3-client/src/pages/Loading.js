import React from 'react';
import Spinner from '../components/Spinner';

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
