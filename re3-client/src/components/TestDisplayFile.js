import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../firebase';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import {r} from 'react-syntax-highlighter/dist/esm/languages/hljs'; //its supposed to be this but it produces a blank page when I use R language
import {c} from 'react-syntax-highlighter/dist/esm/languages/hljs';

// registerLanguage('R', R);

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
    
    <div className="bg-white overflow-y-scroll w-4/5 h-3/4 rounded border-4 border-blue-400  m-10">
      <SyntaxHighlighter language={c} style= {docco}>
       
        {fileContents}
      
      </SyntaxHighlighter>
    </div>
  );
};

export default TestDisplayFile;