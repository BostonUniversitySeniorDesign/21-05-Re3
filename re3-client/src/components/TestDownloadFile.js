import React, { useContext }  from 'react';
import { FirebaseContext } from '../firebase';

const TestDownloadFile = () => {
    const firebase = useContext(FirebaseContext);
    const downloadfile = async () => {
        firebase.downloadFile();
    };
  return (
    <button onClick={() => downloadfile()}
    className="text-2xl font-robot text-white hover:text-black cursor-pointer rounded-md px-4"
        >
            Download File
    </button>
  );
};

export default TestDownloadFile;