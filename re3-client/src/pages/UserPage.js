import React, { useContext } from 'react';
import { AuthContext } from '../firebase';
// import { FirebaseContext } from '../firebase';
import useRouter from '../utils/Router';
import Header from '../components/SimpleHeader';

const UserPage = () => {
  const user = useContext(AuthContext);
  //   const firebase = useContext(FirebaseContext);
    const router = useRouter();
  function pushpage(page) {
    router.push(`${page}`);
}

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <p className="text-3xl font-roboto text-center text-black my-4 mx-8 self-start">{`${user.displayName}`}</p>
      <div className="grid grid-cols-2">
          <div className="min-h-72 w-2/3 bg-blue-300 rounded-md m-10 p-3">
            Past Projects:
          </div>
          <div className="m-10 w-2/5 grid grid-rows-2 justify-end">
              <div>
            <button className=" w-32 bg-blue-300 hover:bg-blue-400 rounded-md" onClick={()=>pushpage("/re3-run")}>Let's Go</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default UserPage;
