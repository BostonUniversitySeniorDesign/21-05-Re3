import React from 'react';
import useRouter from '../utils/Router';
const HeaderSignUpButton = () => {
    const router = useRouter();
    const page = async () => {
        router.push('/signup');
    }
    return (
        <div>
            <button
                href="/signup"
                onClick={() => page()}
                className="text-xl font-robot text-white hover:text-black cursor-pointer rounded-md absolute right-0 mx-32">
                Sign Up
        </button>
        </div>
    );
};
export default HeaderSignUpButton;