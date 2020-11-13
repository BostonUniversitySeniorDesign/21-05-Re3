import React, { useState } from 'react';
// import TestAddUser from '../components/TestButton';
// import TestDownloadFile from '../components/TestDownloadFile';
import RatingNumberButton from '../components/RatingNumberButton';
import TestDisplayFile from '../components/TestDisplayFile';
// import { AuthContext } from '../firebase';
import Header from '../components/RatingHeader';
import HappyFace from '../assets/img/undraw_feeling_happy_jymo.svg'
import SadFace from '../assets/img/undraw_feeling_blue_4b7q.svg'

const Dashboard = () => {
    // const user = useContext(AuthContext);
    const [currentAnswer, setCurrentAnswer] = useState('');
    return (
        <div>
            <Header />
            <div className=" bg-gray-200 text-4xl text-black flex text-left font-hairline font-roboto py-6 px-10">
                Rate This Code:
                </div>
            <div className="bg-gray-200 w-screen h-screen flex flex-col items-center justify-center">

                <TestDisplayFile />
                
            </div>
            <div className=" bg-gray-200 text-3xl text-black text-left font-hairline font-roboto px-8">
                    How Readable is this code?</div>

                <div className=" bg-gray-200 flex flex-row items-center justify-center">

                <img
                        alt="SadFace"
                        src={SadFace}
                        className="w-1/6 full justify-start p-4"
                    />

                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        1
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        2
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        3
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        4
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        5
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        6
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        7
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        8
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        9
        </RatingNumberButton>
                    <RatingNumberButton
                        answer={currentAnswer}
                        setAnswer={setCurrentAnswer}
                    >
                        10
        </RatingNumberButton>
                    <img
                        alt="HappyFace"
                        src={HappyFace}
                        className="w-1/6 full justify-start p-4"
                    />

                </div>


        </div>

    );
};

export default Dashboard;