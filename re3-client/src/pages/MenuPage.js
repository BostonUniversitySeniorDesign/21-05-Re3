import React from 'react';
import Header from '../components/SimpleHeader';
import Card from '../components/Card';
import RatingPic from '../assets/img/undraw_Creation_process_ukbh.svg';
import MLPic from '../assets/img/undraw_proud_coder_7ain.svg';
import ReproducabilityPic from '../assets/img/undraw_Code_review_re_woeb.svg';
import re3Logo from '../assets/img/LOGO3.png';

const MenuPage = () => {
  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen">
      <Header />
      <div className="text-3xl justify-center text-center font-light mt-10 mb-8">
        Welcome to
      </div>
      <img
          alt="re3Logo"
          src={re3Logo}
          className="w-1/5 justify-center items-center transform duration-700 hover:scale-110"
        />
        <div className="text-3xl text-black text-center flex font-roboto font-hairline mb-10">
          Reproducibility, Reusability, Readability
        </div>
        {/* <div className="text-2xl text-black text-center flex font-roboto font-hairline my-10 mx-40">
        Enjoy some of what we have to offer, you can check the Readability of your code and get a few pointers on how to improve it.
        OR you can check the Reproducability of any paper you want. learn more
        </div> */}
      <div className=" m-10 flex space-x-4">
        <div className="transform duration-700 hover:-translate-y-6 inline">
          <Card w="w-4/5 px-4" h="h-72 py-4" color="bg-transparent">
            <a href="/code-readability-services">
            <div className=" justify-center text-center text-4xl font-roboto font-bold ">
                Code Readability
              </div>
              <div className=" justify-center text-center text-md font-roboto font-hairline italic">
                Upload your code and check it's readablity score
              </div>
              <img alt="thePic" src={MLPic} />
              <div className=" justify-center text-center text-md font-roboto font-hairline hover:underline text-blue-500 mt-2">
                Learn more 
              </div>
            </a>
          </Card>
        </div>
        <div className="transform duration-700 hover:-translate-y-6 inline">
          <Card w="w-4/5 px-4" h="h-72 py-4" color="bg-transparent">
            <a href="/dashboard">
            <div className=" justify-center text-center text-4xl font-roboto font-bold ">
                Snippet Rating
              </div>
              <div className=" justify-center text-center text-md font-roboto font-hairline italic">
                Rate Snippets and help us improve our ML model
              </div>
              <img alt="thePic" src={RatingPic} />
              <div className=" justify-center text-center text-md font-roboto font-hairline hover:underline text-blue-500 mt-2">
                Learn more 
              </div>
            </a>
          </Card>
        </div>
        <div className="transform duration-700 hover:-translate-y-6 inline">
          <Card w="w-4/5 px-4" h="h-72 py-4" color="bg-transparent">
            <a href="/re3-run">
            <div className=" justify-center text-center text-4xl font-roboto font-bold ">
                Reproducability Test
              </div>
              <div className=" justify-center text-center text-md font-roboto font-hairline italic">
                Upload code and check if it's reproducable
              </div>
              <img alt="thePic" src={ReproducabilityPic} />
              <div className=" justify-center text-center text-md font-roboto font-hairline hover:underline text-blue-500 mt-2">
                Learn more 
              </div>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default MenuPage;
