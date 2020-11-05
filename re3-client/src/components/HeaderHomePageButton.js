import React from 'react';
import useRouter from '../utils/Router';

const HomePageButton = () => {
    const router =useRouter();
    const page = async() => {
        router.push('/homepage');
    }
    return(
        <button
        onClick ={() => page()}
        className="text-xl font-robot text-white hover:text-black cursor-pointer mx-6">
           Home  
        </button>
    );
};
export default HomePageButton;