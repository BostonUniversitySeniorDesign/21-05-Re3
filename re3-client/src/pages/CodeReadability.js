import React, { useEffect, useState} from 'react';
import Header from '../components/HeaderBestPractices'
//import useRouter from '../utils/Router';
import DisplayFileSmaller from '../components/DisplayFileSmaller.js'

const CodeReadability = () => {
    //const [name, setName] = useState('');
    //const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile] = useState(null);
    const [fileContents,setFileContents] = useState('');
    const [fileRating, setFileRating] = useState('0');

    useEffect(() =>{
      console.log(fileContents.length);
    },)

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
      <div className = "w-full relative min-h-screen bg-gray-200 flex flex-col justify-start">
        <Header/>
        <div className = "grid grid-cols-3 justify-items-center">
          <div className = "flex flex-col col-span-2 w-5/6">
            <div className = "py-2">
              <DisplayFileSmaller className = "px-2 py-4" snippet={fileContents} hidden={fileContents.length===0}/>
            </div>
            <form>
              <input
                type="file"
                value={selectedFile}
                onChange={(e) => update(e)}
              />
            </form>
          </div>
          <div className = "flex flex-col justify-start py-2">
              <div>
                <button onClick={() => callAPI()}  className={`text-white rounded-md px-20 py-2 h-10 w-30 ${fileContents === '' ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-500'}`} disabled = {fileContents === ''}>
                  Get Code Rating
                </button>    
              </div>
              <div className="px-10">
                <text className={`font-roboto text-xl font-bold ${parseFloat(fileRating) >= 3.5 ? (parseFloat(fileRating) >= 6.5 ? 'text-green-600' : 'text-yellow-500'): (parseFloat(fileRating) === 0.0 ? 'text-black' : 'text-red-600')}`}> {parseFloat(fileRating).toFixed(2)} </text>
              </div>
            </div>
        </div>
        
      </div>
    );
}

export default CodeReadability;