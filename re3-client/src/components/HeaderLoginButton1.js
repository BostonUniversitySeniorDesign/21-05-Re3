import React from 'react';
import useRouter from '../utils/Router';
const HeaderLoginButton = () => {
    const router = useRouter();
    const page = async () => {
        router.push('/login');
    }
    return (
        <button
            onClick={() => page()}
            className="text-xl font-robot text-white hover:text-black cursor-pointer rounded-md  absolute  right-0 mx-6">
            Login
        </button>
    );
};
export default HeaderLoginButton;