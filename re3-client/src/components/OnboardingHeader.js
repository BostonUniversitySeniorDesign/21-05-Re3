import React from 'react';
// import HomePageButton from './HeaderHomePageButton';
import SignOutButton from './SignOutButton';
const OnboardingHeader = () => {
  return (
    <div className="w-full bg-blue-500 flex flex-row justify-end py-4 px-10">
      <SignOutButton />
    </div>
  );
};

export default OnboardingHeader;
