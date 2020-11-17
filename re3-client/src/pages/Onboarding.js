import React, { useState, useContext } from 'react';
import { AuthContext } from '../firebase';
import { FirebaseContext } from '../firebase';
import useRouter from '../utils/Router';
import OnboardingHeader from '../components/OnboardingHeader';
import OnboardingOption from '../components/OnboardingOption';

const Onboarding = () => {
  const user = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);
  const router = useRouter();
  const [currentAnswer, setCurrentAnswer] = useState('');

  const submit = async () => {
    await firebase.submitOnboarding(currentAnswer);
    router.push('/dashboard');
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-0 overflow-hidden">
      <OnboardingHeader />
      <div className="bg-gray-200 w-full min-h-screen flex px-32 py-16">
        <div className="w-full flex flex-col justify-start items-start">
          <div className="w-full flex flex-col justify-start items-center mb-6">
            <p className="text-5xl font-roboto text-center text-black mb-4 self-start">{`Hi ${
              user.displayName.split(' ')[0]
            }!`}</p>
            <p className="text-2xl font-roboto text-center text-black mb-8 self-start">
              We need some information before you can continue.
            </p>
            <div className="w-3/4 bg-white flex flex-col rounded-md shadow-md justify-start items-center py-8 mb-8">
              <p className="text-3xl font-roboto font-thin text-center text-black mb-8">
                How much programming experience do you have?
              </p>
              <div className="flex w-full items-center justify-center mb-6">
                <OnboardingOption
                  answer={currentAnswer}
                  setAnswer={setCurrentAnswer}
                >
                  0-1 years
                </OnboardingOption>
              </div>
              <div className="flex w-full items-center justify-center mb-6">
                <OnboardingOption
                  answer={currentAnswer}
                  setAnswer={setCurrentAnswer}
                >
                  1-3 years
                </OnboardingOption>
              </div>
              <div className="flex w-full items-center justify-center mb-6">
                <OnboardingOption
                  answer={currentAnswer}
                  setAnswer={setCurrentAnswer}
                >
                  3-5 years
                </OnboardingOption>
              </div>
              <div className="flex w-full items-center justify-center mb-6">
                <OnboardingOption
                  answer={currentAnswer}
                  setAnswer={setCurrentAnswer}
                >
                  5 years
                </OnboardingOption>
              </div>
            </div>
            <button
              className={`rounded-md text-white py-2 px-4 text-xl ${
                currentAnswer === '' ? 'bg-gray-400' : 'bg-blue-600'
              }`}
              onClick={() => submit()}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
