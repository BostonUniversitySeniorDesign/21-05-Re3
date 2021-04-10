import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext, AuthContext } from '../firebase';
import Header from '../components/SimpleHeader';
import ReproducabilityPic from '../assets/img/undraw_Code_review_re_woeb.svg';
import MLPic from '../assets/img/undraw_proud_coder_7ain.svg';
import { AiFillCloseCircle } from 'react-icons/ai';
import Card from '../components/Card';
import TestDisplayFile from '../components/TestDisplayFile';

const UserPage = () => {
  const user = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);
  const [data, setData] = useState([]);
  const [version, setVersion] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [dataLicense, setDataLicense] = useState('');
  const [codeLicense, setCodeLicense] = useState('');
  const [update, setUpdate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [scores, setScores] = useState([[]]);
  const [runLogs, setRunLogs] = useState('');
  const [buildLogs, setBuildLogs] = useState('');
  const [fileContents, setFileContents] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await firebase.fetchProjects();
      console.log(projects);
      setData(projects);
    };
    if (user && user.uid) {
      fetchProjects(user.uid);
    }
  }, [setData, firebase, update, user]);

  useEffect(() => {
    if (currentID !== '') {
      console.log('updating');
      console.log(currentID);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentID, firebase, update]);

  const dispSnippet = (url) => {
    firebase.DisplayFile(url).then((res) => {
      setFileContents(res);
      setVisible2(true);
    });
  };

  const updatePopUp = async (value) => {
    setVersion(value.version);
    setTitle(value.title);
    setName(value.author);
    setKeywords(value.keywords);
    setDataLicense(value.dataLicense);
    setCodeLicense(value.codeLicense);
    setCurrentID(value.docID);
    var result = Object.keys(value.readability_scores).map((key) => [
      String(key),
      value.readability_scores[key]
    ]);
    setScores(result);
    setRunLogs(value.runLogs);
    setBuildLogs(value.buildLogs);

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
    setVisible2(false);
  }

  let scoreList = scores.map((subarray) => (
    <div className="flex flex-row my-6 mx-2 text-center justify-center">
      {' '}
      <div className="font-semibold mr-2">{subarray[0]}:</div>
      <div>{parseFloat(subarray[1]).toFixed(2)}</div>
    </div>
  ));

  let options = data.map((data) => (
    <div className="grid grid-cols-2 items-center">
      <div>
        <button
          className="text-2xl focus:outline-none transform duration-700 hover:translate-x-8 hover:text-gray-300 rounded-md text-left"
          value={data}
          id={data.docID}
          key={data.docID}
          onClick={() => updatePopUp(data)}
        >
          {data.title}
        </button>
      </div>
      <div
        className={`text-2xl ${
          data.status === 'pending'
            ? 'text-yellow-600'
            : data.status === 'building'
            ? 'text-indigo-700'
            : data.status === 'building error'
            ? 'text-red-700'
            : 'text-green-600'
        }`}
      >
        {data.status}
      </div>
    </div>
  ));

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div
        className={`absolute w-full min-h-screen z-20 items-center justify-center content-center self-start ${
          visible ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center ">
          <button
            onClick={() => xButton()}
            className="text-2xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          <div className="divide-y-2 divide-grey-600 divide-solid">
            <div className="text-center">
              <div className="text-2xl font-bold"> Project File(s) Scores</div>
              {scoreList}
            </div>
            <div className="my-10">
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
              <div className="flex flex-row mt-4 justify-center">
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
            <div>
              <div className="text-2xl font-bold"> Project Logs</div>
              <button
                className={`w-32 h-full bg-blue-400 text-white rounded-md py-2 m-2  text-1xl`}
                onClick={() => dispSnippet(runLogs)}
              >
                Run Logs
              </button>
              <button
                className={`w-32 h-full bg-blue-400 text-white rounded-md py-2 m-2  text-1xl`}
                onClick={() => dispSnippet(buildLogs)}
              >
                Build Logs
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-10 opacity-25 ${
          visible ? 'flex' : 'hidden'
        }`}
      />
      <div
        className={`absolute w-full min-h-screen z-40 items-center justify-center content-center self-start ${
          visible2 ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center ">
          <button
            onClick={() => setVisible2(!visible2)}
            className="text-2xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          <TestDisplayFile snippet={fileContents} />
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-30 opacity-25 ${
          visible2 ? 'flex' : 'hidden'
        }`}
      />
      <p className="text-5xl font-roboto text-center text-black m-8 self-start">{`${
        user ? user.displayName : 'Name'
      }`}</p>
      <div className="grid grid-cols-2">
        <div className="min-h-96 w-4/5 rounded-md m-10 p-3 text-4xl bg-gradient-to-br from-blue-200 via-blue-300 to-blue-200 shadow-lg">
          Past Projects:
          {options}
        </div>
        <div className="m-10 w-4/5 grid grid-rows-2 gap-y-8">
          <Card w="w-4/5 px-4" h="h-64 py-4" color="bg-transparent">
            <a href="/code-readability-services">
              <div className=" justify-center text-center text-2xl font-roboto font-bold hover:text-blue-800 hover:underline">
                Check Readability of code files
              </div>

              <img alt="thePic" src={MLPic} className="w-2/3 float-right" />
            </a>
          </Card>

          <Card w="w-4/5 px-4" h="h-64 py-4" color="bg-transparent">
            <a href="/re3-run">
              <div className=" justify-center text-center text-2xl font-roboto font-bold hover:text-blue-800 hover:underline">
                Start new Reproducible project
                <img
                  alt="thePic"
                  src={ReproducabilityPic}
                  className="w-2/3 float-right"
                />
              </div>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
