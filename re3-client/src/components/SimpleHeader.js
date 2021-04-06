import React from 'react';
import SignOutButton from './SignOutButton';
import MenuDropDown from '../components/MenuDropDown';
import MyAccountButton from '../components/MyAccountButton';


const RatingHeader = () => {
  return (
    <div className="w-full bg-blue-500 flex flex-row justify-end py-4 px-10">
      <div className ="absolute left-0">
        <MenuDropDown/>
      </div>
      <div className="mr-8">
      <MyAccountButton />
      </div>
      <div className="mx-1">
      <SignOutButton />
      </div>
   
    </div>
  );
};

export default RatingHeader;


