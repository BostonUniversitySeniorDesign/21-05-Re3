import React, {useState} from 'react';
import Header from '../components/SimpleHeader';
import DropDown from '../components/DropDown';
import UploadButton from '../components/UploadButton';
import { AiFillCloseCircle } from 'react-icons/ai';
import DragAndDrop from '../components/DragAndDrop';
import useRouter from '../utils/Router';

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
//var Rversion= document.getElementById('customSearch');
// var help;

const ReproducabilityInit = () => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
  const [myFiles, setFiles] = useState([]);

  function FileDetailsInfo() {
    // GET THE FILE INPUT.
    var fi = document.getElementById('myfile');
    var files = new Array(fi.length);
    // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
    if (fi.files.length > 0) {
      for (var i = 0; i <= fi.files.length - 1; i++) {
        files[i] = fi.files.item(i);
        // console.log('file' + i + ' ' + files[i]);
      }
      var newfiles = myFiles.concat(files);
      let uniquefiles = [...new Set(newfiles)];
      setFiles(uniquefiles);
      setVisible1(!visible1);
    } else {
      alert('Please select a file.');
    }
  }
  
  const router = useRouter();
  const [selectedRversion,SetRversion] = useState('');
  console.log(selectedRversion)
  // router.push('/re3-run');
//   const firebase = useContext(FirebaseContext);
  return (
    <div className="w-full relative min-h-screen bg-gray-200 flex flex-col items-center justify-start">
      <Header />

      
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
          {/* <button onClick={() => console.log(myFiles)}>help</button> */}
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
      {/* <div className="w-1/8"> 
        
      </div>  */}

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
          {/* <button onClick={() => console.log(myFiles)}>help</button> */}
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
      <button className="px-4 py-2 font-roboto text-3xl bg-black rounded-md text-white" onClick={() => router.push('/re3-run')}> Run Code </button>
    </div>
  );
};

export default ReproducabilityInit;
