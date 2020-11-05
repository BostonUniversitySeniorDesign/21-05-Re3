import React from 'react';
import Header from '../components/HomePageHeader';
import re3Logo from '../assets/img/LOGO3.png'

const HomePage = () =>{
    return(
    <div>
    <Header/>
    <div className = "bg-gray-200 w-screen h-screen justify-center items-center flex flex-grow">
   
  <img 
    alt ="re3Logo"
    src={re3Logo}
    className ="w-1/4 full justify-center items-center"/>
    </div>
</div>);

} 
export default HomePage;