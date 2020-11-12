import React from 'react';
import TestDownloadFile from './TestDownloadFile';
import SignOutButton from './SignOutButton';


const RatingHeader = () => {
  return (
    <div className="w-full bg-blue-500 flex flex-row justify-end py-4 px-10">
        <TestDownloadFile />
      <SignOutButton />
    </div>
  );
};

export default RatingHeader;


