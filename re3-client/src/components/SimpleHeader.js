import React from 'react';
import SignOutButton from './SignOutButton';


const RatingHeader = () => {
  return (
    <div className="w-full bg-blue-500 flex flex-row justify-end py-4 px-10">
      <SignOutButton />
    </div>
  );
};

export default RatingHeader;


