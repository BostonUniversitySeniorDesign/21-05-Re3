import React from 'react';

const TextInput = ({w, h, placeholder,id,value}) => {

    return(
        <input 
        placeholder= {`${placeholder!=null ? placeholder : "Enter"}`} 
        id ={id}
        defaultValue={value}
        className={`border border-transparent bg-white rounded-md shadow text-1xl overscroll-x-contain m-2 ${w != null ? w : 'w-auto px-4'} ${h != null ? 'h' : 'h-auto py-2'}`}>    
        </input>
    );
};
export default TextInput;
