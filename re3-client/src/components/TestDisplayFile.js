import React, { useContext, useState }  from 'react';
import { FirebaseContext } from '../firebase'; 

const TestDisplayFile = () => {
  const [fileContents, setState] = useState('');
  const firebase = useContext(FirebaseContext);
  const displayfile = async () => {
        firebase.DisplayContents().then((res) => {
          setState(res);
        });
    };
  return (
    <div>
    <button onClick={() => displayfile()}className="text-xl font-robot px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-md"
     >
            Display File
    </button>
    <div>
				{fileContents.split("\n").map((item, key) => {
					return <span key={key}>{item}<br /></span>;
				})}
		</div>
    </div>
  );
};

export default TestDisplayFile;
