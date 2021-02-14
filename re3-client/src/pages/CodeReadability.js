import React, { useEffect, useState} from 'react';
import Header from '../components/HeaderBestPractices'
import useRouter from '../utils/Router';
import DisplayFileSmaller from '../components/DisplayFileSmaller.js'

const CodeReadability = () => {
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContents,setFileContents] = useState('');
    const [fileRating, setFileRating] = useState('0');

    useEffect(() =>{
      console.log(fileContents.length);
    }, [])

    const update = async (e) => {
        let first_file = e.target.files[0];
        let fileReader = new FileReader();

        fileReader.onload = function(e){
            let fileC = e.target.result;
            setFileContents(fileC)
        }

        fileReader.readAsText(first_file);
    }

    const callAPI = () => {
      const response = fetch('http://localhost:5000/',{
        method: 'POST',
        body: fileContents
      })
      .then(response => response.json()
      .then(data => setFileRating(data["readabilityScore"])))
      .catch(error => {
        console.error('Error: ', error);
      });
        return response
    }
    
    

    return (
      <div className = "flex flex-col justify-center">
          <Header/>
          <div className = "flex flex-row ">
            <div className = "flex flex-col justify-center">
              <div className= "px-2 py-2">
                <DisplayFileSmaller className = "px-2 py-4" snippet={fileContents} hidden={fileContents.length===0}/>
              </div>
              <form>
                  <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
                  <input
                  type="file"
                  value={selectedFile}
                  onChange={(e) => update(e)}
                  />
              </form>
            </div>
            <div className = "flex flex-row justify center py-2">
              <div>
                <button onClick={() => callAPI()}  className="bg-blue-700 hover:bg-blue-500 text-white rounded px-20 py-2 h-10 w-30">
                    Get Code Rating
                </button>    
              </div>
              <div className="px-10">
                <text className="border-black-700 font-bold"> {fileRating} </text>
              </div>
            </div>
          </div>
      </div>
    );
}

export default CodeReadability;