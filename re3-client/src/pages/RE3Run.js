import React, { useState, useRef, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080';

const RE3Run = () => {
  const [connected, setConnected] = useState(false);
  const [logs, setLogs] = useState([]);
  const [version, setVersion] = useState(0);

  let socket = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    return () => {
      socket.current.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (containerRef) {
      containerRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);


  const connect = () => {
    socket.current = socketIOClient(ENDPOINT, { query: { Version: version } });
    //socket.current = socketIOClient(ENDPOINT);
    socket.current.on('ack', (data, cb) => {
      cb();
      setConnected(true);
    });
    socket.current.on('stdout', (data) => {
      setLogs((oldLogs) => [...oldLogs, data.log]);
    });
  };

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
      <input type="text" value={version} placeholder="version" onChange={e => setVersion(e.target.value)}/>
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
};

export default RE3Run;
