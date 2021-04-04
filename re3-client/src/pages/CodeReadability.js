import React, { useEffect, useState } from 'react';
import Header from '../components/SimpleHeader';
//import useRouter from '../utils/Router';
import DisplayFileSmaller from '../components/DisplayFileSmaller.js';
import ColorBar from '../components/ColorBar';

const CodeReadability = () => {
  //const [name, setName] = useState('');
  //const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile] = useState(null);
  const [fileContents, setFileContents] = useState('');
  const [fileRating, setFileRating] = useState('0');
  const [suggestion, setSuggestion] = useState('');
  const [arrSuggestion, setArrSuggestion] = useState(['']);

  useEffect(() => {
    console.log(fileContents.length);
  });

  const update = async (e) => {
    let first_file = e.target.files[0];
    let fileReader = new FileReader();
    console.log(first_file);
    if (first_file !== undefined) {
      fileReader.onload = function (e) {
        let fileC = e.target.result;
        setFileContents(fileC);
      };

      fileReader.readAsText(first_file);
    }
  };

  const callAPI = async () => {
    var response = await fetch('http://localhost:5000/', {
      // const response = fetch('https://test-deploy-readability.ue.r.appspot.com',{
      method: 'POST',
      body: fileContents
    })
      .then((response) =>
        response.json().then(function setThingys(data) {
          setFileRating(data['readabilityScore']);
          console.log(suggestion.length);
          setSuggestion(data['suggestion']);
          console.log(suggestion.length);
          console.log(suggestion);
          setArrSuggestion((arrSuggestion) =>
            data['suggestion'].split(',').map((sug) => <li>{sug}</li>)
          );
        })
      )
      .catch((error) => {
        console.error('Error: ', error);
      });

    return response;
  };

  return (
    <div className="w-full relative min-h-screen bg-gray-200 flex flex-col justify-start">
      <Header />
      <div className="grid grid-cols-3 gap-y-4 justify-items-center">
        <div className="flex flex-col col-span-2 w-5/6">
          <div className="py-8">
            <DisplayFileSmaller
              className="px-2 py-4"
              snippet={fileContents}
              hidden={fileContents.length === 0}
            />
          </div>
          {/* <form> */}
          <label className="text-white cursor-pointer rounded-md bg-blue-700 hover:bg-blue-500 px-10 py-2 focus:outline-none my-2 w-2/5 self-center text-center">
            <input
              type="file"
              value={selectedFile}
              onChange={(e) => update(e)}
              className="hidden"
            />
            Upload File
          </label>
          {/* </form> */}
        </div>
        <div className="flex flex-col justify-start py-8">
          <div className="">
            <button
              onClick={() => callAPI()}
              className={`text-white rounded-md px-20 py-2 h-10 w-30 ${
                fileContents === ''
                  ? 'bg-gray-500'
                  : 'bg-blue-700 hover:bg-blue-500 focus:outline-none'
              }`}
              disabled={fileContents === ''}
            >
              Get Code Rating
            </button>
          </div>
          <div className="text-center my-4">
            <text
              className={`font-roboto text-xl font-bold ${
                parseFloat(fileRating) >= 3.0
                  ? parseFloat(fileRating) >= 6.0
                    ? 'text-green-600'
                    : 'text-yellow-500'
                  : parseFloat(fileRating) === 0.0
                  ? 'text-black'
                  : 'text-red-600'
              }`}
            >
              {' '}
              {parseFloat(fileRating).toFixed(2)}{' '}
            </text>
          </div>
          <ColorBar
            className=""
            completed={parseFloat(fileRating).toFixed(2) * 10}
          />
          <div className="flex flex-col resize-y px-2 py-2 w-64 h-72 my-10 border-blue-700 border-4 rounded-lg text-red-600 text-s bg-white">
            <div className={`${suggestion.length === 0 ? 'hidden' : 'flex'}`}>
              <p className="text-3xl text-center font-semibold">Consider:</p>
            </div>
            <div
              className={`${suggestion.length === 0 ? 'hidden' : 'leading-7'}`}
            >
              <ul className="list-disc list-inside">{arrSuggestion}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReadability;
