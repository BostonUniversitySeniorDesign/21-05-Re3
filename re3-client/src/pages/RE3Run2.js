import React, { useState, useRef, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Header from '../components/SimpleHeader';
import DropDown from '../components/DropDown';
import UploadButton from '../components/UploadButton';
import {
  AiFillCloseCircle,
  AiOutlineHourglass,
  AiOutlineCheck
} from 'react-icons/ai';
import DragAndDrop from '../components/DragAndDrop';
import TextInput from '../components/TextInput';


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
  const [version, setVersion] = useState(0);
  const [visible, setVisible] = useState(false);
  const [myFiles, setFiles] = useState([]);
  
  var title = document.getElementById('title');
  var name = document.getElementById('authorName');
  var keywords = document.getElementById('keyWords');
  // create state in parent component that can be mutated by a child component; in this case, DragAndDrop -Lukas
  const [orderedFiles, setOrderedFiles] = useState([]);
  
  function FileDetailsInfo() {
    //TODO remove repeat duplicate files in the array
    // GET THE FILE INPUT.
    var fi = document.getElementById('myfile');
    var files = new Array(fi.length);
    // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
    if (fi.files.length > 0) {
      for (var i = 0; i <= fi.files.length - 1; i++) {
        files[i] = fi.files.item(i);
      }

      var newfiles = myFiles.concat(files); //I thought this would do it .. didn't work
      let uniquefiles = [...new Set(newfiles)];
      
      
      setFiles(uniquefiles);
    //   console.log("myFiles");
    //   console.log(myFiles);
      document.getElementById('myfile').value= "";
    //   setVisible1(!visible1);
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
    socket.current = socketIOClient(ENDPOINT, { query: { Version: version } });
    socket.current.on('ack', (data, cb) => {
      cb();
      setConnected(true);
    });
    socket.current.on('stdout', (data) => {
      setLogs((oldLogs) => [...oldLogs, data.log]);
    });
  };

  let hourglass = (
    <div className="text-gray-700 bg-gray-400 rounded-full text-2xl w-6">
      <AiOutlineHourglass />
    </div>
  );
  let checkmark = (
    <div className="text-white bg-blue-400 rounded-full text-2xl w-6">
      <AiOutlineCheck />
    </div>
  );
  function tmp() {
    // var title = document.getElementById('title');
    // var name = document.getElementById('authorName');
    // var keywords = document.getElementById('keyWords');
    var arr = keywords.value.split(/\s*(?:,|$)\s*/);
    console.log('in tmp');
    console.log(title.value);
    console.log(name.value);
    console.log(keywords.value);
    console.log(arr.length);
    for (var i = 0; i < arr.length; i++) console.log(arr[i]);
  }

  if (!buildContainer) {
    return (
      <div className="w-full relative min-h-screen bg-gray-200 flex flex-col items-center justify-start">
        <Header />

        {/* Key Words Pop Up */}
        <div
          className={`absolute w-full min-h-screen z-50 items-center justify-center content-center self-start ${
            visible ? 'flex' : 'hidden'
          }`}
        >
          <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center">
            <button
              onClick={() => setVisible(!visible)}
              className="text-2xl self-end text-blue-600"
            >
              <AiFillCloseCircle />
            </button>
            <div className="flex flex-row m-4 items-center ">
              <div className="w-32">Author Name: </div>
              <TextInput
                placeholder="ex: John Doe, Jane Doe"
                id="authorName"
                w="w-64 px-4"
              />
            </div>
            <div className="flex flex-row m-4 items-center">
              <div className="w-32">Title: </div>
              <TextInput
                placeholder="ex: A Study in Repreducability"
                id="title"
                w="w-64 px-4"
              />
            </div>
            <div className="flex flex-row m-4 items-center">
              <div className="w-32">Key Words: </div>
              <TextInput
                placeholder="ex: R code, Repreducability"
                id="keyWords"
                w="w-64 px-4"
              />
            </div>
            <button onClick={tmp}>print</button>
          </div>
        </div>
        <div
          className={`absolute w-full h-full bg-black z-40 opacity-25 ${
            visible ? 'flex' : 'hidden'
          }`}
        />


        <div className="self-start text-4xl text-black flex text-left font-bold font-roboto py-8 px-10">
          Code Information
        </div>

        <div className="grid grid-rows-5 grid-flow-col gap-8 mx-8 my-2">
          <div className="grid grid-cols-3 gap-8 justify-start self-start items-center">
            <div className="self-start text-2xl font-light text-black flex text-left font-roboto  w-full">
              R Version Used
            </div>
            <div>
            <DropDown
              title="Select Version"
              data={items}
              setVersion={setVersion}
            />
          </div>
            <div>
            {version === 0 ? hourglass : checkmark}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 justify-start self-start items-center">
            <div className="self-start text-2xl font-light text-black flex text-left font-roboto w-full">
              Files to Upload
            </div>
            <div>
              <UploadButton title= {myFiles.length  === 0 ? "Select Files" : "Add Files"}/>
            </div>
            {myFiles.length === 0 ? hourglass : checkmark}
          </div>

          <div className="grid grid-cols-3 gap-8 justify-start self-start items-center">
            <div className="self-start text-2xl font-light text-black flex text-left font-roboto  w-full">
              Order of Files
            </div>
            <div>
              <button
                className="text-black cursor-pointer rounded-md border border-black bg-gray-300 w-full"
                onClick={FileDetailsInfo}
              >
                Order Files
              </button>
            </div>
            <div>
            {((orderedFiles.length === 0))? hourglass : checkmark}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 justify-start self-start items-center">
            <div className="self-start text-2xl font-light text-black flex text-left font-roboto items-center  w-full">
              Information
            </div>
            <div>
            <button
              className="text-black cursor-pointer rounded-md border border-black bg-gray-300 w-full"
              onClick={() => setVisible(!visible)}
            >
              Enter Information
            </button>
            </div>
            <div>
            {orderedFiles.length === 0 ? hourglass : checkmark}
            </div>
          </div>

          <div className ="row-span-5 items-center self-right">
          <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center ml-16">
            <div className="flex flex-row m-2 p-2">
              <DragAndDrop
                list={myFiles.map((item, idx) => ({
                  id: (idx + 1).toString(),
                  content: item
                }))}
                setParentOrder={setOrderedFiles}
                setSource = {setFiles}
              />
            </div>
          </div>
        </div>
          
          
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
