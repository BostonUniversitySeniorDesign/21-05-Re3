import React from "react";

const UploadButton = () => {
  return (
    <label className ="px-4 py-3 text-black cursor-pointer rounded-md border border-black bg-gray-300">
      Select Files
      <input type="file" className="hidden" name="myfile" id ="myfile" multiple/>
    </label>
  );
};
export default UploadButton;
