import React from 'react';
import HomePageButton from "./HeaderHomePageButton";
import HeaderLoginButton from "./HeaderLoginButton1";
import HeaderSignUpButton from "./HeaderSignUpButton";
const HomePageHeader = () => {
    return (
        <div>
            <div className="bg-indigo-400 border flex flex-row relative px-full py-4 rounded">
            <HomePageButton/>
            {/* <div className="bg-indigo-400 border flex flex-reverserow relative px-full py-4 rounded"></div> */}
            <HeaderLoginButton/>
            <HeaderSignUpButton/>
            </div>
        </div>
    );
};

export default HomePageHeader;