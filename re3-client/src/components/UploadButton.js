import React,{useState, useContext} from "react";
import { FirebaseContext } from '../firebase'; // to save the user info for reproducibility

const UploadButton = () => {

  const firebase = useContext(FirebaseContext);
  const [file, setFile] = useState('')
  const [url, setUrl] = useState({url: ''})
  
  console.log(file)
  const handleFile = (e) => {
      const image = e.target.files[0]
      setFile(imageFile => (image))
  }

  const handleFireBaseUpload = e => {
    e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if(file === '') {
      console.error(`not an image, the image file is a ${typeof(File)}`)
    }
    const uploadTask = firebase.storage.ref(`/reprocibility_projects/${file.name}`).put(file)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      firebase.storage.ref('reprocibility_projects').child(file.name).getDownloadURL()
      .then(fireBaseUrl => {
        setUrl(prevObject => ({...prevObject, url: fireBaseUrl}))
        console.log(fireBaseUrl);
        firebase.currentProjectDoc = firebase.db.collection('project').doc();
        firebase.currentProjectDoc.set({
          URL: fireBaseUrl
        }, { merge: true });
      })
    })
  }

  return (
    <form onSubmit={handleFireBaseUpload}>
    <label className ="px-8 py-2 text-black cursor-pointer rounded-md border border-black bg-gray-300 h-10 w-36">
          Select Files
      <input type="file" className="hidden " name="myfile" id ="myfile" multiple onChange={handleFile}/> 
      </label>
      <button>upload to firebase</button>
    </form>
  );
};
export default UploadButton;

