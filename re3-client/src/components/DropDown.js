import React, { useState } from 'react';

function DropDown({ title, data, setVersion }) {
  const [selected, setSelected] = useState('');

  function handleChange(event) {
    setSelected(event.target.value);
    // below changed from setVersion(version), version isn't finished updating from the line above hence the old value
    setVersion(event.target.value);
    // if (props.ver) props.ver.value =  selected;
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
        value={selected}
      >
        <option>{title}</option>
        {options}
      </select>

      {/* <button className="bg-black text-white"
      onClick= {()=> alert(selected)}
      > show version</button>
      {/* version of R is {selected} */}
    </div>
  );
}

export default DropDown;
