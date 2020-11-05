import React from 'react';
import useRouter from '../utils/Router';
const HeaderSignUpButton = () => {
    const router = useRouter();
    const page = async () => {
        router.push('/login'); //change this once you have a sign up page 
    }
    return (
        <button
            onClick={() => page()}
            className="text-xl font-robot text-white hover:text-black cursor-pointer rounded-md absolute right-0 mx-32">
            Sign Up
        </button>
    );
};
export default HeaderSignUpButton;