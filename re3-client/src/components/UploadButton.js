import React from "react";

const UploadButton = ({title, onChange}) => {
  return (
    <label className ="text-black cursor-pointer rounded-md border border-black bg-gray-300 px-12 py-2 " >
      {title}
      <input type="file" className="hidden" name="myfile" id ="myfile" multiple onChange={onChange}/>
   </label>
  );
};
export default UploadButton;
