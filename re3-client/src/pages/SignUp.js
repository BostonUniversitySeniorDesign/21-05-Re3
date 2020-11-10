import React from 'react';
import Header from '../components/SignUpHeader';
import SignUpPic from '../assets/img/undraw_Login_re_4vu2.svg'


const SignUp = () => {
    return (
        <div>
            <Header />
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-200 py-16">
                <div className="w-4/5 relative h-full flex flex-row justify-center items-center">
                    <img
                        alt="signUpPic"
                        src={SignUpPic}
                        className="w-1/2 absolute left-0 top-0 m-6" />


                    <div class="flex flex-col absolute right-0 bottom-1 m-1 ">
                        <div className="text-3xl text-black  justify-center items-center text-center flex font-hairline font-roboto font-hairline my-10">
                            Sign Up
                        </div>
                        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div class="mb-6 flex flex-row justify-center items-center">
                                <input class="shadow appearance-none border rounded w-full mx-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="FirstName" type="text" placeholder="First Name" />
                                <input class="shadow appearance-none border rounded w-full mx-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="LastName" type="text" placeholder="Last Name" />
                            </div>
                            <div class="mb-6 justify-center items-center ">{/* the x axis's size needs to be fixed */}
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="text" placeholder="Email" />
                            </div>
                            <div class="mb-6 justify-center items-center ">{/* the x axis's size needs to be fixed */}
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passwd1" type="password" placeholder="Password" />
                            </div>
                            <div class="mb-6 justify-center items-center ">{/* the x axis's size needs to be fixed */}
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="passwd2" type="password" placeholder="Password" />
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Sign Up
                                </button>
                                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                                    already have an account? Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}
export default SignUp;