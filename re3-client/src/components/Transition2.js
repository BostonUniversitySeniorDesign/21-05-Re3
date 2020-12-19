import React from 'react';
import Header from '../components/SimpleHeader';
import thinking from '../assets/img/undraw_processing_thoughts_d8ha.svg'

const Transition2 = () => {
    return (
        <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-start">
            <Header />
            <div className="self-start text-4xl text-black font-bold flex text-left font-roboto py-8 px-10">
                Thank you for completing the survey!
            </div>
            <div className="self-start text-3xl text-black flex text-left font-roboto py-0 px-16">
                    Your answers will help us immensely   
            </div>
            <img
                alt="thinking"
                src={thinking}
                className="w-1/2 h-2/3 p-8" />

        </div>
    );
};

export default Transition2;