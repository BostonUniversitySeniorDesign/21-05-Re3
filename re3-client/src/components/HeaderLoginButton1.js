import React from 'react';
import useRouter from '../utils/Router';
const HeaderLoginButton = () => {
  const router = useRouter();
  const page = async () => {
    router.push('/login');
  };
  return (
    <button
      onClick={() => page()}
      className="text-2xl font-robot text-white hover:text-black cursor-pointer rounded-md">
      Login
    </button>
  );
};
export default HeaderLoginButton;
