import React, { useState, useRef, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Header from '../components/SimpleHeader';
import DropDown from '../components/DropDown';
import UploadButton from '../components/UploadButton';
// import FileDetails from '../components/FileDetails';
import PopUpButton from '../components/PopUpButton'

const ENDPOINT = 'http://localhost:8080';

var items = [
  { name:
'4.0.3'},
{ name:
'4.0.2'},
{ name:
'4.0.1'},
{ name:
'4.0.0'},
{ name:
'3.6.3'},
{ name:
'3.6.2'},
{ name:
'3.6.1'},
{ name:
'3.6.0'},
{ name:
'3.5.3'},
{ name:
'3.5.2'},
{ name:
'3.5.1'},
{ name:
'3.5.0'},
{ name:
'3.4.4'},
{ name:
'3.4.3'},
{ name:
'3.4.2'},
{ name:
'3.4.1'},
{ name:
'3.4.0'},
{ name:
'3.3.3'},
{ name:
'3.3.2'},
{ name:
'3.3.1'},
{ name:
'3.3.0'},
{ name:
'3.2.5'},
{ name:
'3.2.4'},
{ name:
'3.2.3'},
{ name:
'3.2.2'},
{ name:
'3.2.1'},
{ name:
'3.2.0'},
{ name:
'3.1.3'},
{ name:
'3.1.2'},
{ name:
'3.1.1'},
{ name:
'3.1.0'},
{ name:
'3.0.3'},
{ name:
'3.0.2'},
{ name:
'3.0.1'},
{ name:
'3.0.0'}
];

const RE3Run = () => {
  const [buildContainer, setBuildContainer] = useState(false);
  const [connected, setConnected] = useState(true);
  const [logs, setLogs] = useState([]);
  const containerRef = useRef(null);
  let socket = useRef(null);
  const [selectedRversion,SetRversion] = useState('');
  console.log(selectedRversion)

  useEffect(() => {
    return () => {
      if(socket === null){
        socket.current.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    if (containerRef === null) {
        containerRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  const connect = () => {
    socket.current = socketIOClient(ENDPOINT);
    socket.current.on('ack', (data, cb) => {
      cb();
      setConnected(true);
    });
    socket.current.on('stdout', (data) => {
      setLogs((oldLogs) => [...oldLogs, data.log]);
    });
  };

  if (!buildContainer){
    return (
      <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />
      <div className="self-start text-4xl text-black flex text-left font-bold font-roboto py-8 px-10">
        Code Information
      </div>

      <div className="flex flex-row justify-start self-start">
        <div className="self-start text-2xl text-black flex text-left font-roboto py-8 px-20">
          R Version Used
        </div>
        <div className="self-start py-8">
          <DropDown title="Select Version" data={items} SetRversion={SetRversion}/>

          {/* <button onClick={()=> alert(Rversion.value)}>Help2</button> */}
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
        {/* <FileDetails/> */}
        {/* <button className="border border-black rounded-md h-8 w-24"
        onClick = {FileDetails}>
            idk
        </button> */}
        <PopUpButton/>

        {/* <p id="fp"></p> */}
      </div>
      <button className="px-4 py-2 font-roboto text-3xl bg-black rounded-md text-white" onClick={setBuildContainer(true)}> Run Code </button>
    </div>
    );
  }
  else{
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
