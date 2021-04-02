import React, { useState } from 'react';

const TextInput = ({ w, h, placeholder, id,onChange, border }) => {
  const [ ,setText] = useState('');

  function handleChange(event) {
    setText(event.target.value);
    onChange(event.target.value);
  }

  return (
    <input
      placeholder={`${placeholder !== null ? placeholder : 'Enter'}`}
      id={id}
      onChange={handleChange}
      className={`bg-white rounded-md text-md overflow-x-scroll placeholder-gray-500 
      border ${border != null ? border : ''} 
        ${w != null ? w : 'w-auto px-4'}
         ${h != null ? h : 'h-auto py-2'}`}
    ></input>
  );
};
export default TextInput;
