import React from 'react';
import Header from '../components/SimpleHeader';
import Card from '../components/Card';
import RatingPic from '../assets/img/undraw_Creation_process_ukbh.svg';
import MLPic from '../assets/img/undraw_proud_coder_7ain.svg';
import ReproducabilityPic from '../assets/img/undraw_Done_checking_re_6vyx.svg';


const MenuPage = () => {
  return (
    <div className="w-full relative min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />
      <div className="grid grid-flow-col grid-rows-1 items-center gap-5 m-10">
        <div>
          <Card w="w-4/5 px-4" h="h-72 py-4">
            <a href="/thanks">
              {' '}
              Upload your code and check it's readablity score
              <img alt="thePic" src={MLPic} />
            </a>
          </Card>
        </div>
        <div>
          <Card w="w-4/5 px-4" h="h-72 py-4">
            <a href="/dashboard">
              {' '}
              Rate Snippets and help us improve our MLM
              <img alt="thePic" src={RatingPic} />
            </a>
          </Card>
        </div>
        <div>
          <Card w="w-4/5 px-4" h="h-72 py-4">
            <a href="/re3-run">
              {' '}
              Upload code and check if it's reproducable
              <img alt="thePic" src={ReproducabilityPic} />
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default MenuPage;
