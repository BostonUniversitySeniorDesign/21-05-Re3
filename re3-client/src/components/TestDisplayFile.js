import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../firebase';

const TestDisplayFile = () => {
  const [fileContents, setState] = useState('');
  const firebase = useContext(FirebaseContext);
  const displayfile = async () => {
    firebase.DisplayContents().then((res) => {
      setState(res);
    });
  };
  displayfile();
  return (
    <div className="h-74 overflow-y-auto overflow-x-hidden rounded border-2 border-blue-400 px-4 py-4">
      {fileContents.split('\n').map((item, key) => {
        return (
          <span key={key}>
            {item}
            <br />
          </span>
        );
      })}
    </div>
  );
};

export default TestDisplayFile;
