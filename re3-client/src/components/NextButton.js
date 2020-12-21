import React from 'react';
import useRouter from '../utils/Router';
const NextButton = ({page}) => {
    const router = useRouter();
    const nextpage = async () => {
        router.push(`${page}`);
    }
    return(
       
        <div>
            <button
                href= {page}
                onClick={() => nextpage()}
                className="bg-blue-400 text-xl font-robot text-white hover:text-black hover: bg-blue-500 cursor-pointer rounded-md absolute right-0 mx-32 w-24 h-12">
                Next
        </button>
        </div>
    );
};
export default NextButton;