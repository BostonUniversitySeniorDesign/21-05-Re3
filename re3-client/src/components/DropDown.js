import React, { useState } from 'react';


function DropDown(props) {

  const [data] = useState(props.data);
  
  const [selectedData, updateSelectedData] = useState('');

  function handleChange(event) {
    updateSelectedData(event.target.value);
    props.SetRversion(selectedData);
    // if (props.ver) props.ver.value =  selectedData;
  }
  let options = data.map((data) => (
    <option key={data.name} value={data.name} id={data.name}>
      {data.name}
    </option>
  ));
//    var ver= document.getElementById('customSearch');
  return (
    <div>
      <select
        name="customSearch"
        id="customSearch"
        className="w-36 h-10 text-center px-4 custom-search-select border border-black rounded-md bg-gray-300 "
        onChange={handleChange}
        value={selectedData}
      >
        <option>
        {props.title}
        </option>
        {options}
      </select>

      {/* <button className="bg-black text-white"
      onClick= {()=> alert(selectedData)}
      > show version</button>
      {/* version of R is {selectedData} */}
    </div>
  );
}

export default DropDown;
