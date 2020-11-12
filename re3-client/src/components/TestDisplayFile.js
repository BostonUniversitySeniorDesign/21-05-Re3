import React, { useContext, useState, useEffect} from 'react';
import { FirebaseContext } from '../firebase';

const TestDisplayFile = ({snippet}) => {
  const [fileContents, setFileContents] = useState('');
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    firebase.DisplayContents().then((res) => {
      setFileContents(res);
    });
  }, [])

  //displayfile();
  console.log("Before returning")
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
    <div className="h-40 w-1/2 overflow-y-auto overflow-x-hidden rounded border-2 border-blue-400 px-10 py-4">
      {snippet.split('\n').map((item, key) => {
        return (
          <span key={key}>
            {item}
            <br />
          </span>
        );
      })}
    </div>
    {/*<button onClick={() => nextSnippet()}>next</button>*/}
    </div>
    
  );
};

export default TestDisplayFile;
