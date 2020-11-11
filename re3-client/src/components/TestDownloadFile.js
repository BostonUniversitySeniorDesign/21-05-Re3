import React, { useContext }  from 'react';
import { FirebaseContext } from '../firebase';

const TestDownloadFile = () => {
    const firebase = useContext(FirebaseContext);
    const downloadfile = async () => {
        firebase.downloadFile();
    };
  return (
    <button onClick={() => downloadfile()}className="text-xl font-robot px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-md inline-flex items-center"
        >
          <svg className="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
          Download
    </button>
  );
};

export default TestDownloadFile;
