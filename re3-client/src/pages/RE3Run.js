import React, { useState, useRef, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Header from '../components/SimpleHeader';
import DropDown from '../components/DropDown';
import UploadButton from '../components/UploadButton';
// import FileDetails from '../components/FileDetails';
import { AiFillCloseCircle } from 'react-icons/ai';
import DragAndDrop from '../components/DragAndDrop';
// import PopUpButton from '../components/PopUpButton';

const ENDPOINT = 'http://localhost:8080';

var items = [
  { name: '4.0.3' },
  { name: '4.0.2' },
  { name: '4.0.1' },
  { name: '4.0.0' },
  { name: '3.6.3' },
  { name: '3.6.2' },
  { name: '3.6.1' },
  { name: '3.6.0' },
  { name: '3.5.3' },
  { name: '3.5.2' },
  { name: '3.5.1' },
  { name: '3.5.0' },
  { name: '3.4.4' },
  { name: '3.4.3' },
  { name: '3.4.2' },
  { name: '3.4.1' },
  { name: '3.4.0' },
  { name: '3.3.3' },
  { name: '3.3.2' },
  { name: '3.3.1' },
  { name: '3.3.0' },
  { name: '3.2.5' },
  { name: '3.2.4' },
  { name: '3.2.3' },
  { name: '3.2.2' },
  { name: '3.2.1' },
  { name: '3.2.0' },
  { name: '3.1.3' },
  { name: '3.1.2' },
  { name: '3.1.1' },
  { name: '3.1.0' },
  { name: '3.0.3' },
  { name: '3.0.2' },
  { name: '3.0.1' },
  { name: '3.0.0' }
];

const RE3Run = () => {
  const [buildContainer, setBuildContainer] = useState(false);
  const [connected, setConnected] = useState(false);
  const [logs, setLogs] = useState([]);
  const containerRef = useRef(null);
  let socket = useRef(null);
  const [selectedRversion, SetRversion] = useState(0);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [myFiles, setFiles] = useState([]);


  function FileDetailsInfo() { //TODO remove repeat duplicate files in the array
    // GET THE FILE INPUT.
    var fi = document.getElementById('myfile');
    var files = new Array(fi.length);
    // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
    if (fi.files.length > 0) {
      for (var i = 0; i <= fi.files.length - 1; i++) {
        files[i] = fi.files.item(i);
      }
      
      var newfiles = myFiles.concat(files);//I thought this would do it .. didn't work
      let uniquefiles = [...new Set(newfiles)];
      setFiles(uniquefiles);
      setVisible1(!visible1);

    } else {
      alert('Please select a file.');
    }
  }

  useEffect(() => {
    return () => {
      socket.current.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  const connect = () => {
    socket.current = socketIOClient(ENDPOINT, {query: {Version: selectedRversion}});
    socket.current.on('ack', (data, cb) => {
      cb();
      setConnected(true);
    });
    socket.current.on('stdout', (data) => {
      setLogs((oldLogs) => [...oldLogs, data.log]);
    });
  };

  if (!buildContainer) {
    return (
      <div className="w-full relative min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />

      {/* Drag and Drop PopUp */}
      <div
        className={`absolute w-full min-h-screen z-20 items-center justify-center content-center self-start ${
          visible1 ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center">
          <button
            onClick={() => setVisible1(!visible1)}
            className="text-2xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          <div className="flex flex-row m-2 p-2">
            <DragAndDrop
              list={myFiles.map((item, idx) => ({
                id: (idx + 1).toString(),
                content: item
              }))}
            />
          </div>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-10 opacity-25 ${
          visible1 ? 'flex' : 'hidden'
        }`}
      />
      {/* Key Words Pop Up */}
      <div
        className={`absolute w-full min-h-screen z-50 items-center justify-center content-center self-start ${
          visible2 ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center">
          <button
            onClick={() => setVisible2(!visible2)}
            className="text-2xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          Hello
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-40 opacity-25 ${
          visible2 ? 'flex' : 'hidden'
        }`}
      />
    
      <div className="self-start text-4xl text-black flex text-left font-bold font-roboto py-8 px-10">
        Code Information
      </div>

      <div className="flex flex-row justify-start self-start">
        <div className="self-start text-2xl text-black flex text-left font-roboto py-8 px-20">
          R Version Used
        </div>
        <div className="self-start py-8">
          <DropDown title="Select Version" data={items} SetRversion={SetRversion}/>
        </div>
      </div>

      <div className="flex flex-row justify-start self-start">
        <div className="self-start text-2xl text-black flex text-left font-roboto py-8 px-20">
          Files to Upload
        </div>
        <div className="self-start py-8">
          <UploadButton />
        </div>
      </div>

      <div className="flex flex-row justify-start self-start">
        <div className="self-start text-2xl text-black flex text-left font-roboto py-8 px-20">
          Order of Files
        </div>
        <button
          className="mx-4 my-6 text-black cursor-pointer rounded-md border border-black bg-gray-300 h-12 w-32 "
          onClick={FileDetailsInfo}
        >
          Order Files
        </button>
      </div>

      <div className="flex flex-row justify-start self-start">
        <div className="self-start text-2xl text-black flex text-left font-roboto py-8 px-20">
          Key Words
        </div>
        <button
          className="mx-8 my-6 text-black cursor-pointer rounded-md border border-black bg-gray-300 h-12 w-32 "
          onClick={() => setVisible2(!visible2)}
        >
          Enter Key Words
        </button>
        </div>
        <button
          className="px-4 py-2 font-roboto text-3xl bg-black rounded-md text-white"
          onClick={() => setBuildContainer(true)}
        >
          {' '}
          Run Code{' '}
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-full bg-gray-200 min-h-screen flex flex-col items-center justify-center py-16">
        <p className="font-roboto text-6xl text-black mb-2">RE3 Run</p>
        <div
          className="h-80 w-3/4 bg-black rounded mb-4 flex flex-col items-start justify-start overflow-y-scroll"
          ref={containerRef}
        >
          {logs.map((log, index) => (
            <p
              key={index}
              className={`w-full text-lg font-mono text-white whitespace-pre-wrap pl-4 py-1 ${
                index % 2 === 0 ? 'bg-gray-900' : 'bg-black'
              }`}
            >
              {log}
            </p>
          ))}
        </div>
        <button
          onClick={() => connect()}
          disabled={connected}
          className={`px-4 py-2 font-roboto text-3xl rounded-md text-white ${
            connected
              ? 'bg-gray-600 cursor-default'
              : 'bg-blue-500 cursor-pointer'
          }`}
        >
          Run Code
        </button>
      </div>
    );
  }
};

export default RE3Run;
