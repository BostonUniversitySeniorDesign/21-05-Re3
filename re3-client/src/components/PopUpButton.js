import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
// import FileDetails from '../components/FileDetails'

const PopUpButton = () => {
  const [visible, setVisible] = useState(false);

  function FileDetailsInfo() {
    // GET THE FILE INPUT.
    var fi = document.getElementById('myfile');

    // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
    if (fi.files.length > 0) {
      setVisible(!visible);

      // THE TOTAL FILE COUNT.
      document.getElementById('fp').innerHTML =
        'Total Files: <b>' + fi.files.length + '</b></br >';

      // RUN A LOOP TO CHECK EACH SELECTED FILE.
      for (var i = 0; i <= fi.files.length - 1; i++) {
        var fname = fi.files.item(i).name; // THE NAME OF THE FILE.

        // SHOW THE EXTRACTED DETAILS OF THE FILE.
        document.getElementById('fp').innerHTML =
          document.getElementById('fp').innerHTML + '<br /> ' + fname;
      }
    } else {
      alert('Please select a file.');
    }
  }

  return (
    <div>
      <div
        className={`absolute w-full h-full z-20 items-center justify-center ${
          visible ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-3/4 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center">
          <button
            onClick={() => setVisible(!visible)}
            className="text-2xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          <p className="text-2xl" id="fp">
            {/* <FileDetails/> */}
          </p>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-10 opacity-25 ${
          visible ? 'flex' : 'hidden'
        }`}
      />
      <div className="w-1/8" />
      <div className="w-1/8">
        <button
          className="transition duration-500 ease-in-out transform px-4 py-3 text-black cursor-pointer rounded-md border border-black bg-grey-300"
          onClick={FileDetailsInfo}
        >
          help3
        </button>
      </div>
    </div>
    // <div>
    //     <button
    //         className="transition duration-500 ease-in-out transform hover:scale-125 text-6xl text-blue-600"
    //         onClick={() => setVisible(!visible)}
    //       >Pop Up</button>

    //       <FileDetails/>
    //       <p id= "fp"></p>
    // </div>
  );
};
export default PopUpButton;
