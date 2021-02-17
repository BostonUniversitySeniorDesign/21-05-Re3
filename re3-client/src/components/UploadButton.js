import React from "react";

const UploadButton = () => {
  return (
    <label className ="px-8 py-2 text-black cursor-pointer rounded-md border border-black bg-gray-300 h-10 w-36">
      Select Files
      <input type="file" className="hidden " name="myfile" id ="myfile" multiple/>
    </label>
  );
};
export default UploadButton;
