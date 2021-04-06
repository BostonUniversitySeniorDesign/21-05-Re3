import React, { useState, useContext, useEffect } from 'react';
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
import { FirebaseContext, AuthContext } from '../firebase';
import useRouter from '../utils/Router';
import items from '../data/r-versions';

const RE3Run = () => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(AuthContext);
  const [version, setVersion] = useState(0);
  const [visible, setVisible] = useState(false);
  const [myFiles, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [dataLicense, setDataLicense] = useState('');
  const [codeLicense, setCodeLicense] = useState('');
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState([]);
  const [currentURL, setCurrentURL] = useState('');
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dependencies, setDependencies] = useState('');

  // create state in parent component that can be mutated by a child component; in this case, DragAndDrop -Lukas
  const [orderedFiles, setOrderedFiles] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (currentURL !== '') {
      setUrl([...url, currentURL]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentURL]);

  useEffect(() => {
    if (orderedFiles.Ordered !== undefined) {
      if (url.length === orderedFiles.Ordered.items.length) {
        firebase.currentProjectDoc = firebase.db.collection('containers').doc();
        firebase.currentProjectDoc.set(
          {
            URL: url
          },
          { merge: true }
        );
        firebase.storeProjectData(
          dependencies.split(/\s*(?:,|$)\s*/),
          version,
          title,
          name,
          keywords.split(/\s*(?:,|$)\s*/),
          user.uid,
          dataLicense,
          codeLicense,
          scores
        );
        startRun();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

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
      document.getElementById('myfile').value = '';
      //   setVisible1(!visible1);
    } else {
      alert('Please select a file.');
    }
    console.log(name);
  }

  async function saveInfo() {
    // console.log(orderedFiles.Ordered.items.length);
    setSubmitted(true);
    await saveScores();
    for (var i = 0; i <= orderedFiles.Ordered.items.length - 1; i++) {
      var file = orderedFiles.Ordered.items[i].content;
      // console.log(file);
      console.log('starting task');
      const filename = file.name;
      const uploadTask = firebase.storage
        .ref(`/reproducibility_projects/${user.uid}/${user.uid}/${file.name}`)
        .put(file);
      //initiates the firebase side uploading
      uploadTask.on('state_changed', {
        complete: () => {
          firebase.storage
            .ref('reproducibility_projects')
            .child(user.uid)
            .child(user.uid)
            .child(filename)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              console.log('yeah man looks good');
              setCurrentURL(fireBaseUrl);
            })
            .catch((e) => {
              console.log('not good man', e);
              setSubmitted(false);
            });
        }
      });
    }
  }

  async function callAPI(fileContents) {
    //const response = await fetch('http://localhost:5000/get_scores', {
    const response = await fetch(
      'https://re3deploy.ue.r.appspot.com/get_scores',
      {
        method: 'POST',
        body: JSON.stringify(fileContents)
      }
    )
      .then((response) =>
        response.json().then((data) => {
          console.log(data);
          setScores(data);
        })
      )
      .catch((error) => {
        console.error('Error: ', error);
      });
    return response;
  }

  async function saveScores() {
    var dict = {};

    for (const item of orderedFiles.Ordered.items) {
      //console.log(item.content);

      await new Promise((resolve, reject) => {
        var file = item.content;
        let fileReader = new FileReader();

        fileReader.onload = function (e) {
          //console.log(file.name);
          dict[file.name] = e.target.result;
          resolve(fileReader.result);
        };

        fileReader.readAsText(file);
      });
    }

    console.log(dict);
    await callAPI(dict);
  }

  const startRun = async () => {
    const response = await fetch('http://192.168.1.2:8080/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dependencies: dependencies,
        version: version,
        projectRef: firebase.currentProjectDoc.path
      })
    }).catch((e) => {
      console.log('fetch error...', e);
      setSubmitted(false);
      return -1;
    });
    console.log(response);
    if (response.status === 200) {
      console.log('success');
      router.push('/userpage');
    } else {
      console.log('error...', response);
      setSubmitted(false);
    }
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
  function Documenting() {
    setCodeLicense(document.getElementById('codeLicense').value);
    setDataLicense(document.getElementById('dataLicense').value);
    setKeywords(document.getElementById('keyWords').value);
    setVisible(!visible);
  }

  return (
    <div className="w-full relative min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />

      {/* Key Words Pop Up */}
      <div
        className={`absolute w-full min-h-screen z-50 items-center justify-center content-center self-start ${
          visible ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-2/3 h-full flex flex-col items-center justify-center bg-gray-200 rounded-md ">
          <button
            onClick={() => setVisible(!visible)}
            className="text-3xl self-end text-blue-600 m-4"
          >
            <AiFillCloseCircle />
          </button>
          <div className="text-3xl text-center">
            Licenses and associated keywords
          </div>
          <div className="flex flex-row items-center m-4 ">
            <div className="w-48 text-2xl font-light">Code License: </div>
            <TextInput
              placeholder="ex: Apache License 2.0"
              id="codeLicense"
              w="w-64 px-4"
              border="shadow"
              onChange={setCodeLicense}
            />
          </div>
          <div className="flex flex-row items-center m-4">
            <div className="w-48 text-2xl font-light">Data License: </div>
            <TextInput
              placeholder="ex: PDDL"
              id="dataLicense"
              w="w-64 px-4"
              border="shadow"
              onChange={setDataLicense}
            />
          </div>
          <div className="flex flex-row items-center m-4">
            <div className="w-48 text-2xl font-light">Key Words: </div>
            <TextInput
              placeholder="ex: R code, Repreducability"
              id="keyWords"
              w="w-64 px-4"
              border="shadow"
              onChange={setKeywords}
            />
          </div>
          <button
            className="w-1/5 h-full bg-blue-400 rounded-md py-2 m-8 text-white text-1xl"
            onClick={Documenting}
          >
            Done
          </button>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-black z-40 opacity-25 ${
          visible ? 'flex' : 'hidden'
        }`}
      />

      <div className="self-start text-4xl text-black flex text-left font-bold font-roboto py-8 px-10">
        Code and Dataset Information
      </div>

      <div className="grid grid-rows-5 grid-flow-col gap-6 mx-7 my-2 px-16">
        <div className="grid grid-cols-3 gap-4 justify-start self-start items-center">
          <div className="self-start text-2xl font-light text-black flex text-left font-roboto w-full ">
            Author Name
          </div>
          <TextInput
            placeholder="ex: John Doe, Jane Doe"
            id="authorName"
            w="w-44 px-2"
            onChange={setName}
            border="border-black"
          />

          {name === '' ? hourglass : checkmark}
        </div>
        <div className="grid grid-cols-3 gap-4 justify-start self-start items-center">
          <div className="self-start text-2xl font-light text-black flex text-left font-roboto w-full ">
            Title
          </div>
          <TextInput
            placeholder="ex: A Study in Repreducability"
            id="title"
            w="w-44 px-2"
            border="border-black"
            onChange={setTitle}
          />

          {title === '' ? hourglass : checkmark}
        </div>
        <div className="grid grid-cols-3 gap-4 justify-start self-start items-center">
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
          <div>{version === 0 ? hourglass : checkmark}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 justify-start self-start items-center">
          <div className="self-start text-2xl font-light text-black flex text-left font-roboto">
            Files to Upload
          </div>
          <div className="items-center">
            <UploadButton
              title={myFiles.length === 0 ? 'Select Files' : 'Add Files'}
              onChange={FileDetailsInfo}
            />
          </div>
          {myFiles.length === 0 ? hourglass : checkmark}
        </div>

        <div className="grid grid-cols-3 gap-4 justify-start self-start items-center">
          <div className="self-start text-2xl font-light text-black flex text-left font-roboto items-center  w-full">
            Information
          </div>
          <div>
            <button
              className="text-black cursor-pointer rounded-md border border-black bg-gray-300 w-full p-2"
              onClick={() => setVisible(!visible)}
            >
              Enter Information
            </button>
          </div>
          <div>
            {dataLicense === '' && codeLicense === '' ? hourglass : checkmark}
          </div>
        </div>
        <div className="flex flex-row items-center m-4">
            <div className="w-48 text-2xl font-light">Dependencies: </div>
            <TextInput
              placeholder="ex: ggplot gridExtra"
              id="dependencies"
              w="w-64 px-4"
              border="shadow"
              onChange={ e => setDependencies(document.getElementById('dependencies').value)}
            />
          </div>
        <div className="row-span-4 items-center self-right">
          <div className="w-2/3 h-2/3 flex flex-col items-center justify-center bg-gray-200 rounded-md text-center ml-16">
            <div className="flex flex-row m-2 p-2">
              <DragAndDrop
                list={myFiles.map((item, idx) => ({
                  id: (idx + 1).toString(),
                  content: item
                }))}
                setParentOrder={setOrderedFiles}
                setSource={setFiles}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className={`px-4 py-2 font-roboto text-3xl rounded-md text-white ${
          submitted ? 'bg-gray-400' : 'bg-black'
        }`}
        onClick={saveInfo}
        disable={submitted}
      >
        Run Code
      </button>
    </div>
  );
};

export default RE3Run;
