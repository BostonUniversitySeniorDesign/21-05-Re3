import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext, AuthContext } from '../firebase';
import Header from '../components/SimpleHeader';
import ReproducabilityPic from '../assets/img/undraw_Code_review_re_woeb2.svg';
// import RE3Run from '../pages/RE3Run3';
import useRouter from '../utils/Router';
import { AiFillCloseCircle } from 'react-icons/ai';
// import TextInput from '../components/TextInput';

const UserPage = () => {
  const user = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState([]);
  const [version, setVersion] = useState('');
  const [visible, setVisible] = useState(false);
  const [dataLicense, setDataLicense] = useState('');
  const [codeLicense, setCodeLicense] = useState('');
  const [update, setUpdate] = useState(false);
  const [edit, setEdit] = useState(false);
  // const [dockerRun, setdockerRun]=useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [keywords, setKeywords] = useState([]);
  const router = useRouter();

  function pushpage(page) {
    console.log('pressed');
    router.push(`${page}`);
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await firebase.fetchProjects();
      console.log(projects);
      setData(projects);
    };
    fetchProjects();
  }, [setData, firebase, update]);

  useEffect(() => {
    if (currentID !== '') {
      console.log('updating');
      console.log(currentID);
      //   console.log('done, check it out', url);
      //   setBuildContainer(true);
      //   console.log(url);
      // firebase.currentProjectDoc = firebase.db.collection('containers').doc();
      // console.log(firebase.currentProjectDoc);
      // firebase.currentProjectDoc.set(
      //   {
      //     URL: url
      //   },
      //   { merge: true }
      // );
      firebase.updateProjectData(
        currentID,
        version,
        title,
        name,
        keywords.split(/\s*(?:,|$)\s*/),
        codeLicense,
        dataLicense
      );
    }
    // }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentID, firebase, update]);

  const updatePopUp = async (value) => {
    setVersion(value.version);
    setTitle(value.title);
    setName(value.author);
    setKeywords(value.keywords);
    setDataLicense(value.dataLicense);
    setCodeLicense(value.codeLicense);
    setCurrentID(value.docID);
    document.getElementById('authorName').value = value.author;
    document.getElementById('title').value = value.title;
    document.getElementById('keyWords').value = value.keywords;
    document.getElementById('version').value = value.version;
    document.getElementById('dataLicense').value = value.dataLicense;
    document.getElementById('codeLicense').value = value.codeLicense;

    setVisible(!visible);
  };

  function updateButton() {
    setCurrentID(currentID);
    setTitle(document.getElementById('title').value);
    setName(document.getElementById('authorName').value);
    setKeywords(document.getElementById('keyWords').value);
    setVersion(document.getElementById('version').value);
    setCodeLicense(document.getElementById('codeLicense').value);
    setDataLicense(document.getElementById('dataLicense').value);
    console.log(document.getElementById('authorName').value);
    setUpdate(!update);
    setEdit(!edit);
    setVisible(!visible);
  }
  function xButton() {
    console.log(codeLicense);
    setEdit(false);
    setVisible(!visible);
  }

  let options = data.map((data) => (
    <button
      className="text-2xl focus:outline-none transform duration-700 hover:translate-x-8 hover:text-gray-300 w-full rounded-md text-left"
      value={data}
      id={data.docID}
      key={data.docID}
      onClick={() => updatePopUp(data)}
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
            onClick={() => xButton()}
            className="text-2xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          <div className="grid grid-rows-7 grid-cols-3 gap-x-8 gap-y-4 items-center text-left mx-10 ">
            <div className="text-2xl font-bold grid col-start-1 row-start-1">
              Catagories
            </div>
            <div className="text-2xl font-bold grid col-start-2 row-start-1">
              Current information
            </div>
            <div className="text-2xl font-bold grid col-start-3 row-start-1">
              Edited information
            </div>

            <div className="grid col-start-1 row-start-2 text-gray-600 ">
              Author Name:{' '}
            </div>
            <div className="grid col-start-2 row-start-2"> {name} </div>
            <div className="grid col-start-3 row-start-2">
              <input
                disabled={!edit}
                placeholder="ex: John Doe, Jane Doe"
                id="authorName"
                defaultValue={name}
                className={`bg-white rounded-md text-md overflow-x-scroll placeholder-gray-500 border shadow w-auto px-4 h-auto py-2 ${
                  edit ? 'opacity-100' : 'opacity-25'
                }`}
              ></input>
            </div>

            <div className="grid col-start-1 row-start-3 text-gray-600 ">
              Title:{' '}
            </div>
            <div className="grid col-start-2  row-start-3"> {title} </div>
            <div className="grid col-start-3 row-start-3">
              <input
                disabled={!edit}
                placeholder="ex: A Study in Repreducability"
                id="title"
                defaultValue={title}
                className={`bg-white rounded-md text-md overflow-x-scroll placeholder-gray-500 border shadow w-auto px-4 h-auto py-2 ${
                  edit ? 'opacity-100' : 'opacity-25'
                }`}
              ></input>
            </div>
            <div className="grid col-start-1 row-start-4 text-gray-600 ">
              Key Words:{' '}
            </div>
            <div className="grid col-start-2 row-start-4"> {keywords} </div>
            <div className="grid col-start-3 row-start-4">
              <input
                disabled={!edit}
                placeholder="ex: R code, Repreducability"
                id="keyWords"
                defaultValue={keywords}
                className={`bg-white rounded-md text-md overflow-x-scroll placeholder-gray-500 border shadow w-auto px-4 h-auto py-2 ${
                  edit ? 'opacity-100' : 'opacity-25'
                }`}
              ></input>
            </div>

            <div className="grid col-start-1 row-start-5 text-gray-600 ">
              R Version:{' '}
            </div>
            <div className="grid col-start-2 row-start-5"> {version} </div>
            <div className="grid col-start-3 row-start-5">
              <input
                disabled={!edit}
                placeholder="ex: 4.0.0"
                id="version"
                defaultValue={version}
                className={`bg-white rounded-md text-md overflow-x-scroll placeholder-gray-500 border shadow w-auto px-4 h-auto py-2 ${
                  edit ? 'opacity-100' : 'opacity-25'
                }`}
              ></input>
            </div>
            <div className="grid col-start-1 row-start-6 text-gray-600 ">
              Data License:{' '}
            </div>
            <div className="grid col-start-2 row-start-6">
              {dataLicense !== '' ? dataLicense : 'N/A'}
            </div>
            <div className="grid col-start-3 row-start-6">
              <input
                disabled={!edit}
                placeholder="ex: PDDL"
                id="dataLicense"
                defaultValue={dataLicense}
                className={`bg-white rounded-md text-md overflow-x-scroll placeholder-gray-500 border shadow w-auto px-4 h-auto py-2 ${
                  edit ? 'opacity-100' : 'opacity-25'
                }`}
              ></input>
            </div>
            <div className="grid col-start-1 row-start-7 text-gray-600 ">
              Code License:{' '}
            </div>
            <div className="grid col-start-2 row-start-7">
              {codeLicense !== '' ? codeLicense : 'N/A'}
            </div>
            <div className="grid col-start-3 row-start-7">
              <input
                disabled={!edit}
                placeholder="ex: Apache License 2.0"
                id="codeLicense"
                defaultValue={codeLicense}
                className={`bg-white rounded-md text-md overflow-x-scroll placeholder-gray-500 border shadow w-auto px-4 h-auto py-2 ${
                  edit ? 'opacity-100' : 'opacity-25'
                }`}
              ></input>
            </div>
          </div>
          <div className="flex flex-row">
            <button
              className={`w-32 h-full ${
                edit ? 'bg-gray-300 text-black' : 'bg-blue-400 text-white'
              } rounded-md py-2 m-2  text-1xl`}
              onClick={() => setEdit(!edit)}
              disabled={edit}
            >
              Edit
            </button>
            <button
              className={`w-32 h-full ${
                edit ? 'bg-blue-400 text-white' : 'bg-gray-300 text-black'
              } rounded-md py-2 m-2  text-1xl`}
              onClick={() => updateButton()}
              disabled={!edit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-40 opacity-25 ${
          visible ? 'flex' : 'hidden'
        }`}
      />
      <p className="text-5xl font-roboto text-center text-black m-8 self-start">{`${user.displayName}`}</p>
      <div className="grid grid-cols-2">
        <div className="min-h-96 w-4/5 rounded-md m-10 p-3 text-4xl bg-gradient-to-br from-blue-300 via-blue-400 to-blue-300 shadow-lg">
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
              <p className="text-3xl">Start a new Reproducable Project:</p>
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
