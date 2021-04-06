import React from 'react';
import Header from '../components/SimpleHeader';
import Card from '../components/Card';
import RatingPic from '../assets/img/undraw_Web_search_re_efla.svg';
import MLPic from '../assets/img/undraw_Upload_re_pasx.svg';
// import ReproducabilityPic from '../assets/img/undraw_Code_review_re_woeb.svg';
// import re3Logo from '../assets/img/LOGO3.png';

const ReproducabilityOptionsPage = () => {
  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen">
      <Header />
      {/* <img
          alt="re3Logo"
          src={re3Logo}
          className="w-1/5 justify-center items-center transform duration-700 hover:scale-110 mt-20"
        />
        <div className="text-3xl text-black text-center flex font-roboto font-hairline mb-10">
          Reproducibility, Reusability, Readability
        </div> */}
        <div className="text-2xl text-black text-center flex font-roboto font-hairline my-10 mx-40">
        Where you can Upload files or a DOI to test for reproducability  
        </div>
      <div className="grid grid-cols-2 grid-rows-1 items-end gap-5 m-10">
        <div className="transform duration-700 hover:-translate-y-6 self-center">
          <Card w="w-3/5 px-4" h="h-72 py-4">
            <a href="/re3-run">
              <div className=" justify-center text-center text-2xl font-roboto">
                Upload your code and check if it's reproducabile
              </div>
              <img alt="thePic" src={MLPic} />
            </a>
          </Card>
        </div>
        <div className="transform duration-700 hover:-translate-y-6 self-center">
          <Card w="w-3/5 px-4" h="h-72 py-4">
            <a href="/dashboard">
              <div className=" justify-center text-center text-2xl font-roboto">
                Search for an existing project to check it's reproducability
              </div>
              <img alt="thePic" src={RatingPic} />
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ReproducabilityOptionsPage;
