import React, {useState} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import useRouter from '../utils/Router';

const MenuDropDown = () => {
    const router = useRouter();
    function pushpage(page) {
        router.push(`${page}`);
    }
    const [drop, setDrop]= useState(false);
    var hide ="transform opacity-0 scale-95";
    var show="transform opacity-100 scale-100";
    const className = drop ? show : hide;
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-transparent text-3xl font-medium text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setDrop(!drop)}
        >
          <AiOutlineMenu />
        </button>
      </div>
      <div
        className={`z-10 transition ease-out duration-100 origin-top-right absolute left-0 mt-2 w-56 h-4/5 rounded-md shadow-lg bg-white ring-2 ring-black ring-opacity-5 divide-y divide-gray-300 ${className}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1">
          <button
            href="/homepage"
            className="block px-4 py-2 w-56 text-left text-md text-gray-700 hover:bg-gray-200 hover:text-black focus:outline-none"
            role="menuitem"
            onClick={() => pushpage('/homepage')}
            disabled={!drop}
          >
            Home
          </button>
        </div>
        <div className="py-1">
          <button
            href="/dashboard"
            className="block px-4 py-2 w-56 text-left text-md text-gray-700 hover:bg-gray-200 hover:text-black focus:outline-none"
            role="menuitem"
            onClick={() => pushpage('/dashboard')}
            disabled={!drop}
          >
            Rating
          </button>
        </div>
        <div className="py-1">
          <button
            href="/code-readability-services"
            className="block px-4 py-2 w-56 text-left text-md text-gray-700 hover:bg-gray-200 hover:text-black focus:outline-none"
            role="menuitem"
            onClick={() => pushpage('/code-readability-services')}
            disabled={!drop}
          >
            Readability
          </button>
          <button
            href="/re3-run"
            className="block px-4 py-2 w-56 text-left text-md text-gray-700 hover:bg-gray-200 hover:text-black focus:outline-none"
            role="menuitem"
            onClick={() => pushpage('/re3-run')}
            disabled={!drop}
          >
            Reproducability
          </button>
        </div>
      </div>
    </div>
  );
};
export default MenuDropDown;
