import React from 'react';
import TestDownloadFile from './TestDownloadFile';
import SignOutButton from './SignOutButton';
import MenuDropDown from '../components/MenuDropDown'


const RatingHeader = () => {
  return (
    <div className="w-full bg-blue-500 flex flex-row justify-end py-4 px-10">
      <div className ="absolute left-0">
        <MenuDropDown/>
      </div>
        <TestDownloadFile />
      <SignOutButton />
    </div>
  );
};

export default RatingHeader;


