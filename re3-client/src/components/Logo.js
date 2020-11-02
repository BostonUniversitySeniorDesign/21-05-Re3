import React from 'react';

const Logo = ({ name }) => {
  return (
    <div>
      <p className="text-6xl font-roboto text-black font-semibold">{name}</p>
      <p className="text-3xl font-roboto text-black">
        Reproducibility, Reusability, Readability
      </p>
    </div>
  );
};

export default Logo;
