import React, { useContext }  from 'react';
import { FirebaseContext } from '../firebase';

const TestAddUser = () => {
    const firebase = useContext(FirebaseContext);
    const adduserdb = async () => {
        firebase.addUserDb();
    };
  return (
    <button onClick={() => adduserdb()}className="text-xl font-robot px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-md"
        >
            Add User
    </button>
  );
};

export default TestAddUser;
