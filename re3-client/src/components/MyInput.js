import React, { useState } from 'react';

const MyInput = ({ component: Component, ...rest }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <input
      className="rounded bg-blue-200 border-2"
      value={input}
      onChange={handleChange}
    />
  );
};

export default MyInput;
