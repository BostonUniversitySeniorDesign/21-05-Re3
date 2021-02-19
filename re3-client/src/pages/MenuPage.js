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
        <div className="text-2xl text-black text-center flex font-roboto font-hairline my-10 mx-40">
        Enjoy some of what we have to offer, you can check the Readability of your code and get a few pointers on how to improve it.
        OR you can check the Reproducability of any paper you want 
        </div>
      <div className="grid grid-flow-col grid-rows-1 items-end gap-5 m-10">
        <div className="transform duration-700 hover:-translate-y-6">
          <Card w="w-4/5 px-4" h="h-72 py-4">
            <a href="/thanks">
              <div className=" justify-center text-center text-2xl font-roboto">
                Upload your code and check it's readablity score
              </div>
              <img alt="thePic" src={MLPic} />
            </a>
          </Card>
        </div>
        <div className="transform duration-700 hover:-translate-y-6">
          <Card w="w-4/5 px-4" h="h-72 py-4">
            <a href="/dashboard">
              <div className=" justify-center text-center text-2xl font-roboto">
                Rate Snippets and help us improve our ML model
              </div>
              <img alt="thePic" src={RatingPic} />
            </a>
          </Card>
        </div>
        <div className="transform duration-700 hover:-translate-y-6">
          <Card w="w-4/5 px-4" h="h-72 py-4">
            <a href="/ReproducabilityOptions">
              <div className=" justify-center text-center text-2xl font-roboto">
                Upload code and check if it's reproducable
              </div>
              <img alt="thePic" src={ReproducabilityPic} />
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default MenuPage;
