import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext, AuthContext } from '../firebase';
import Header from '../components/SimpleHeader';
import ReproducabilityPic from '../assets/img/undraw_Code_review_re_woeb2.svg';
// import RE3Run from '../pages/RE3Run3';
import useRouter from '../utils/Router';
import {
  AiFillCloseCircle,
} from 'react-icons/ai';
import TextInput from '../components/TextInput';

const UserPage = () => {
  const user = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState([]);
  const [version, setVersion] = useState(0);
  const [visible, setVisible] = useState(false);
  // const [myFiles, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState([]);
  const router = useRouter();

  
  function pushpage(page) {
    console.log("pressed");
    router.push(`${page}`);
  }
  
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await firebase.fetchProjects();
      setData(projects);
    };
    fetchProjects();
  }, [setData, firebase]);

  function updatePopUp(value) {
    setVersion(value.version);
    setTitle(value.title);
    setName(value.author);
    setKeywords(value.keywords);
    setVisible(!visible);
  }

  function updateValues(){
    setTitle(document.getElementById('title').value);
    setName(document.getElementById('authorName').value);
    setKeywords(document.getElementById('keyWords').value);
    setVersion(document.getElementById('version').value);
    // console.log(document.getElementById('authorName').value);
    setVisible(!visible);
  }
  function resetValues() {
    document.getElementById('authorName').value=name;
    document.getElementById('title').value=title;
    document.getElementById('keyWords').value=keywords;
    document.getElementById('version').value=version;
    setVersion(version);
    setTitle(title);
    setName(name);
    setKeywords(keywords);
    setVisible(!visible);
  }

  let options = data.map((data) => (
    <button
      className="text-2xl focus:outline-none transform duration-700 hover:translate-x-8 hover:text-gray-300 w-full rounded-md text-left"
      value={data}
      id={data.title}
      key={data.title}
      onClick={() => updatePopUp(data)}
      href="/re3-run"
    >
      {data.title}
    </button>
  ));

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div
        className={`absolute w-full min-h-screen z-50 items-center justify-center content-center self-start ${
          visible ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center">
          <button
            onClick={() => resetValues()}
            className="text-2xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          <div className="flex flex-row m-2 items-center ">
            <div className="w-32">Author Name: </div>
            <TextInput
              placeholder="ex: John Doe, Jane Doe"
              id="authorName"
              w="w-64 px-4"
              value={name}
            />
          </div>
          <div className="flex flex-row m-2 items-center">
            <div className="w-32">Title: </div>
            <TextInput
              placeholder="ex: A Study in Repreducability"
              id="title"
              w="w-64 px-4"
              value={title}
            />
          </div>
          <div className="flex flex-row m-2 items-center">
            <div className="w-32">Key Words: </div>
            <TextInput
              placeholder="ex: R code, Repreducability"
              id="keyWords"
              w="w-64 px-4"
              value={keywords}
            />
          </div>
          <div className="flex flex-row m-2 items-center">
            <div className="w-32">R Version: </div>
            <TextInput
              placeholder="ex: 4.0.0"
              id="version"
              w="w-64 px-4"
              value={version}
            />
          </div>
          <button
            className="w-1/5 h-full bg-blue-400 rounded-md py-2 m-2 text-white text-1xl"
            onClick={() => updateValues()}
          >
            Update
          </button>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-40 opacity-25 ${
          visible ? 'flex' : 'hidden'
        }`}
      />
      <p className="text-5xl font-roboto text-center text-black m-8 self-start">{`${user.displayName}`}</p>
      <div className="grid grid-cols-2">
        <div className="min-h-96 w-4/5 border-blue-900 rounded-md m-10 p-3 text-4xl border-4 bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-500">
          Past Projects:
          {options}
        </div>
        <div className="m-10 w-4/5 grid grid-rows-2">
          <div>
            <div className="m-2">
              
                <img
                  alt="thePic"
                  src={ReproducabilityPic}
                  className="w-2/5 float-right"
                />
                <p className="text-3xl">
                  Start a new Reproducability Project:
                </p>
              
            </div>
            <div>
              <button
                className=" w-full p-2 bg-blue-400 hover:bg-indigo-500 rounded-md text-white self-center"
                onClick={() => pushpage('re3-run')}
                href="/re3-run"
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
