import React, { useContext } from 'react';
import SignOutButton from '../components/SignOutButton';
import TestAddUser from '../components/TestButton';
import TestDownloadFile from '../components/TestDownloadFile';
import { AuthContext } from '../firebase';

const Dashboard = () => {
  const user = useContext(AuthContext);
  return (
    <div className="bg-gray-200 w-screen h-screen flex flex-col items-center justify-center">
      <p className="text-2xl font-roboto text-center text-black mb-4">{`Signed in as ${user.displayName} 🚀`}</p>
      <SignOutButton />
      <br/>
      <TestAddUser />
      <br/>
      <TestDownloadFile />
    </div>
  );
};

export default Dashboard;
