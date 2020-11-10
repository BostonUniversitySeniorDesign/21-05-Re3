import React, { useContext } from 'react';
// import SignOutButton from '../components/SignOutButton';
import { AuthContext } from '../firebase';
import OnboardingHeader from '../components/OnboardingHeader';

const Onboarding = () => {
  const user = useContext(AuthContext);
  return (
    <div>
      <OnboardingHeader />
      <div className="bg-gray-200 w-screen min-h-screen flex p-32">
        <div className="w-full flex flex-col justify-start items-start">
          <div className="w-full flex flex-col justify-start items-start mb-6">
            <p className="text-5xl font-roboto text-center text-black mb-4">{`Hi ${
              user.displayName.split(' ')[0]
            }!`}</p>
            <p className="text-2xl font-roboto text-center text-black mb-4">
              We need some information before you can continue.
            </p>
            <div className="w-full bg-white flex flex-col rounded-md shadow-md justify-start items-center">
              <p className="text-3xl font-roboto font-thin text-center text-black">
                How many years of programming experience do you have?
              </p>
            </div>
          </div>
          {/* <SignOutButton/> */}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
