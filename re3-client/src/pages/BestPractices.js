import React, { useState} from 'react';
import Header from '../components/HeaderBestPractices'
import useRouter from '../utils/Router';

const BestPractices = () => {

    const [checked_1, setChecked_1] = useState(false);
    const [checked_2, setChecked_2] = useState(false);
    const [checked_3, setChecked_3] = useState(false);
    const [checked_4, setChecked_4] = useState(false);
    const router = useRouter();
    const page = async () => {
      router.push('/code-readability-services');
    };
    return (
        <div className="w-full relative min-h-screen bg-gray-200 flex flex-col items-center justify-start">
            <Header/>
            <form>
                <label>
                    Are you following best practices 1?
                   <input type = "checkbox" checked = {checked_1} onChange={() => setChecked_1(!checked_1)}>
                    </input>
                </label>
                <br/>
                <label>
                    Are you following best practices 2?
                   <input type = "checkbox" checked = {checked_2} onChange={() => setChecked_2(!checked_2)}>
                    </input>
                </label>
                <br/>
                <label>
                    Are you following best practices 3?
                   <input type = "checkbox" checked = {checked_3} onChange={() => setChecked_3(!checked_3)}>
                    </input>
                </label>
                <br/>
                <label>
                    Are you following best practices 4?
                   <input type = "checkbox" checked = {checked_4} onChange={() => setChecked_4(!checked_4)}>
                    </input>
                </label>
            </form>
            <button  className={`font-roboto rounded-md px-6 py-2 text-black border-2 text-xl mx-2 ${
                !(checked_1 && checked_2 && checked_3 && checked_4) === true ? 'bg-gray-500' : 'bg-blue-300 hover:bg-blue-600 border-blue-400'}`}
                disabled={!(checked_1 && checked_2 && checked_3 && checked_4)} onClick={() => page()}>
                Proceed
            </button>
        </div>
    );
};



export default BestPractices;
