import React from 'react';
import HomePageButton from './HeaderHomePageButton';
import HeaderLoginButton from './HeaderLoginButton1';
const HomePageHeader = () => {
  return (
    <div className="w-full bg-blue-500 flex flex-row justify-end relative py-4 px-10">
      {/* <HomePageButton /> */}
      <HeaderLoginButton />
    </div>
  );
};

export default HomePageHeader;
