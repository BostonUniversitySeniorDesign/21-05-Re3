import React from 'react';

export const ProgressBar = ({ completed }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-center rounded-full text-blue-600 bg-blue-200">
        <div>
          <span className="text-l font-semibold inline-block py-1 px-2 uppercase">
            Task in progress
          </span>
        </div>
        <div className="text-right">
          <span className="text-l font-semibold inline-block py-1 px-2 text-blue-600">
            {completed}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-3 mb-4 text-l flex rounded bg-blue-200 w-64">
        <div
          style={{ width: `${completed}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
