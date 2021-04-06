import React from 'react';
import useRouter from '../utils/Router';
// import Header from '../components/HeaderBestPractices'

const HomePageButton = () => {
  const router = useRouter();
  const page = async () => {
    router.push('/');
  };
  return (
    <div>
      {/* <Header/> */}
      <button
        href="/"
        onClick={() => page()}
        className="text-2xl font-robot text-white hover:text-black cursor-pointer focus:outline-none"
      >
        Home
      </button>
    </div>
  );
};
export default HomePageButton;
