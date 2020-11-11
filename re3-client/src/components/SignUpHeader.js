import React from 'react';

import HomePageButton from "./HeaderHomePageButton";
const SignUpHeader = () => {
    return (
        <div>
            <div className="bg-blue-500 border flex flex-row relative px-10 py-4 rounded">
                <HomePageButton />
            </div>
        </div>
    );
};

export default SignUpHeader;
