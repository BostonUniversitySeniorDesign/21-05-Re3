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
  const [questionIdx, setQuestionIdx] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentUserInfo, setcurrentUserInfo] = useState({});

  const questions = [
                    "What is your gender?",
                    "What is your background?",
                    "How much programming experience do you have?",
                    "What level coding courses are you taking:",
                    "Are you familiar with R programming language?"];

  const answer = [
    ["Male","Female", "Other", "Rather not say"],
    ["Science, technology, engineering, maths (STEM)", "Social Science", "Other"],
    ["0-1 years", "1-3 years", "3-5 years", " > 5 years"],
    ["100-level courses", "200-level courses", "300-level courses", "400-level courses", "I'm a graduate student", "I'm not taking coding courses"],
    ["Yes","Noo"]
  ];

  const submit = async () => {
    switch(questionIdx) {
      case 0:
        setcurrentUserInfo({gender: currentAnswer});
        setQuestionIdx(questionIdx + 1);
        break;
      case 1:
        setcurrentUserInfo({...currentUserInfo, background: currentAnswer});
        setQuestionIdx(questionIdx + 1);
        break;
      case 2:
        setcurrentUserInfo({...currentUserInfo, experience: currentAnswer});
        setQuestionIdx(questionIdx + 1);
        break;
      case 3:
        setcurrentUserInfo({...currentUserInfo, courses: currentAnswer});
        setQuestionIdx(questionIdx + 1);
        break;
      default:
        await firebase.submitOnboarding({...currentUserInfo, familiarWithR: currentAnswer}); 
        router.push('/thanks');
        break;
    }
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
              {questions[questionIdx]}
              </p>
                {answer[questionIdx].map((item, index) => (
                  <div key={index} className="flex w-full items-center justify-center mb-6">
                  <OnboardingOption answer={currentAnswer} setAnswer={setCurrentAnswer}>{item}</OnboardingOption>
                  </div>
                ))}
            </div>

            <button
              className={`rounded-md text-white py-2 px-4 text-xl ${
                currentAnswer === '' ? 'bg-gray-400' : 'bg-blue-600'
              }`}
              onClick={() => submit()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
