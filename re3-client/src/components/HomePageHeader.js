import React from 'react';
import HomePageButton from "./HeaderHomePageButton";
import HeaderLoginButton from "./HeaderLoginButton1";
import HeaderSignUpButton from "./HeaderSignUpButton";
const HomePageHeader = () => {
    return (
        <div>
            <div className="bg-blue-500 border flex flex-row relative px-full py-4 rounded">
            <HomePageButton/>
            <HeaderLoginButton/>
            <HeaderSignUpButton/>
            </div>
        </div>
    );
};

export default HomePageHeader;