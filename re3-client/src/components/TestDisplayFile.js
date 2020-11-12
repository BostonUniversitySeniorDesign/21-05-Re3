import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../firebase';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const TestDisplayFile = () => {
  const [fileContents, setState] = useState('');
  const firebase = useContext(FirebaseContext);

  
  const displayfile = async () => {
    firebase.DisplayContents().then((res) => {
      setState(res);
    });
  };

  // bg-white h-2/5 w-4/5 overflow-y-auto rounded border-4 border-blue-400 px-4 py-4 my-16 mx-32
  displayfile();
  return (
    <div className="bg-white overflow-y-scroll w-4/5 h-2/3 rounded border-4 border-blue-400  m-10">
      <SyntaxHighlighter language="R" style= {lightfair}>
        {fileContents}
      {/* {fileContents.split('\n').map((item, key) => {
        console.log(fileContents);
        return (
          <div key={key}>
            {item === '' ? <br /> : null}
            <p className="whitespace-pre-wrap">{item}</p>
          </div>
        );
      })} */}
      </SyntaxHighlighter>
    </div>
  );
};

export default TestDisplayFile;