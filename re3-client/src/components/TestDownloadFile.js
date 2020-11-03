import React, { useContext }  from 'react';
import { FirebaseContext } from '../firebase';

const TestDownloadFile = () => {
    const firebase = useContext(FirebaseContext);
    const downloadfile = async () => {
        firebase.downloadFile();
    };
  return (
    <button onClick={() => downloadfile()}className="text-xl font-robot px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-md"
        >
            Download File
    </button>
  );
};

export default TestDownloadFile;
