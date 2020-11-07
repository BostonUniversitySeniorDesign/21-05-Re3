import React from 'react';
import Header from '../components/HomePageHeader';
import re3Logo from '../assets/img/LOGO3.png'
import firstPic from '../assets/img/undraw_Analysis_re_w2vd.svg'
import secondPic from '../assets/img/undraw_code_inspection_bdl7.svg'
import thirdPic from '../assets/img/undraw_Meeting_re_i53h.svg'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className=" flex flex-col justify-center items-center bg-gray-200">
      
        <img
        alt="firstPic"
        src={firstPic}
        className="w-1/3 full justify-center items-center my-6" />

        <div className="text-6xl text-black text-center flex font-hairline font-roboto font-hairline my-10">
          Who are we?
        </div>
        <img
          alt="re3Logo"
          src={re3Logo}
          className="w-1/4 full justify-center items-center" />

        <div className="text-3xl text-black text-center flex font-hairline font-roboto font-hairline">
          Reproducibility, Reusability, Readability
        </div>
        <div className="text-4xl text-black text-center flex font-hairline font-roboto font-hairline my-12">
          What do we do?
        </div>
        <img
        alt="secondPic"
        src={secondPic}
        className="w-1/3 full justify-center items-center my-6" />
        <div className="text-2xl text-black text-center flex font-hairline font-roboto font-hairline my-10 mx-40">
          We offer a platform that will assest researchers in bettering the readability of 
          their code and to asses the reproducibility of the same code
        </div>

        <div className="text-4xl text-black text-center flex font-hairline font-roboto font-hairline my-10">
          Why use our platform?
        </div>
        <img
        alt="thirdPic"
        src={thirdPic}
        className="w-1/3 full justify-center items-center my-6" />
        <div className="text-2xl text-black text-center flex font-hairline font-roboto font-hairline my-10 mx-40">
          Something Something
        </div>
      </div>
    </div>

  );

}
export default HomePage;