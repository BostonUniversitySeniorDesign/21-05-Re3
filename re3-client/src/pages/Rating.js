import React from 'react';
// import TestAddUser from '../components/TestButton';
// import TestDownloadFile from '../components/TestDownloadFile';
import TestDisplayFile from '../components/TestDisplayFile';
// import { AuthContext } from '../firebase';
import Header from '../components/RatingHeader';
import Pic from '../assets/img/undraw_Process_re_gws7.svg'

const Dashboard = () => {
    // const user = useContext(AuthContext);
    return (
        <div>
            <Header />
            <div className =" bg-gray-200 text-4xl text-black flex text-left font-hairline font-roboto py-6 px-10">
                Rate This Code: 
                </div>
            <div className="bg-gray-200 w-screen h-screen flex flex-col items-center justify-center">
                
                
                
                <TestDisplayFile />
                <img
                        alt="Pic"
                        src={Pic}
                        className="w-1/6 full justify-start p-2"
                    />
                {/* <div className="flex flex-row items-center justify-start">
                    <img
                        alt="Pic"
                        src={Pic}
                        className="w-1/3 full justify-start p-2"
                    />
                </div> */}

            </div>
            {/* <div className="bg-gray-200 w-screen h-screen flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-start">
                    <img
                        alt="Pic"
                        src={Pic}
                        className="w-1/3 full justify-start p-2"
                    />
                </div>
            </div> */}

        </div>
    );
};

export default Dashboard;