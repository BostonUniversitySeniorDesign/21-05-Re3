import React from 'react';
import useRouter from '../utils/Router';


const MyAccountButton = () => {
  const router = useRouter();
  const page = async () => {
    router.push('/userpage');
  };
  return (
    <div>
      <button
        href="/"
        onClick={() => page()}
        className="text-2xl font-robot text-white hover:text-black cursor-pointer focus:outline-none"
      >
        My Account
      </button>
    </div>
  );
};
export default MyAccountButton;
