import React from 'react';

export const ColorBar = ({ completed}) => {
  return (
    <div className="relative pt-1">
        <div style={{background: 'linear-gradient(to right, red 0%, yellow 35%, green 100%)'}} 
        className="overflow-hidden h-3 mb-4 text-l flex flex-row-reverse rounded w-70">
            <div
            style={{width: `${100-completed}%`}}
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
            ></div>
        </div>
    </div>
  );
};

export default ColorBar;
