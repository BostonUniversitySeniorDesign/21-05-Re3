import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Temp2 from './DragAndDrop';

const PopUpButton = () => {

  const [visible, setVisible] = useState(false);
  const [myFiles, setFiles] = useState([]);

//   let options = myFiles.map((item, idx) => [
//     { id: idx.toString(), content: item }
//   ]);

// function removeDuplicates(data){
//     let r= data.filter((value,index)=> data.indexOf(value)===index);
//     console.log("no duplicated");
//     console.log(r);
//     return r;
// }

  function FileDetailsInfo() {
    // GET THE FILE INPUT.
    var fi = document.getElementById('myfile');
    var files = new Array(fi.length);
    // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
    if (fi.files.length > 0) {
      

      // THE TOTAL FILE COUNT.
      //   document.getElementById('fp').innerHTML =
      //     'Total Files: <b>' + fi.files.length + '</b></br >';

      // RUN A LOOP TO CHECK EACH SELECTED FILE.
      for (var i = 0; i <= fi.files.length - 1; i++) {
        // var fname = fi.files.item(i).name; // THE NAME OF THE FILE.
        files[i] = fi.files.item(i);
        console.log('file' + i + ' ' + files[i]);
      }
      var newfiles = myFiles.concat(files);
    //   console.log("newfiles");
    //   console.log(newfiles);
      let uniquefiles = [...new Set(newfiles)];
      setFiles(uniquefiles);
    //   console.log("uniqe files");
    //   console.log(uniquefiles);
    //   console.log('myFiles' + myFiles);
    //   console.log('options' + options);
      setVisible(!visible);
      //   const newContainer = document.createElement("DragAndDropContainer");
      //   var att = document.createAttribute("data");
      //   att.value = files;
      //   newContainer.setAttributeNode(att);
      //   const currentDiv = document.getElementById("fp");
      //   document.body.appendChild(newContainer, currentDiv);
      //   <DragAndDropContainer data = {files}/>
      //   for( var j =0 ; j <= files.length-1; j++){
      //     // var fname = files[j].name; // THE NAME OF THE FILE.
      //     document.getElementById('fp').innerHTML =
      //     // document.createElement('div')=
      //         <DragAndDropContainer items = {files}/>
      // document.getElementById('fp').innerHTML + '<br /> ' +
      //     fname;
      //   }
    } else {
      alert('Please select a file.');
    }
  }

  return (
    <div>
      <div
        className={`absolute w-full h-full z-20 items-center justify-center ${
          visible ? 'flex' : 'hidden'
        }`}
      >
        <div className="w-3/4 flex flex-col items-center justify-center bg-gray-200 rounded-md py-4 px-8 text-center">
          <button
            onClick={() => setVisible(!visible)}
            className="text-2xl self-end text-blue-600"
          >
            <AiFillCloseCircle />
          </button>
          {/* <button onClick={() => console.log(myFiles)}>help</button> */}
          <div className="flex flex-row m-2 p-2">
            <Temp2
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
          visible ? 'flex' : 'hidden'
        }`}
      />
      <div className="w-1/8" />
      <div className="w-1/8">
        <button
          className="transition duration-500 ease-in-out transform px-4 py-3 text-black cursor-pointer rounded-md border border-black bg-grey-300"
          onClick={FileDetailsInfo}
        >
          help3
        </button>
      </div>
    </div>
  );
};
export default PopUpButton;
