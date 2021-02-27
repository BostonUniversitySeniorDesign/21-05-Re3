import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../firebase';
import { FirebaseContext } from '../firebase';
import useRouter from '../utils/Router';
import Header from '../components/SimpleHeader';

const UserPage = () => {
  // const user = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  function pushpage(page) {
    router.push(`${page}`);
  }
  // function pastProjects() {
  useEffect(() => {
    var fun = firebase.fetchProjects();
    setData(fun);

    // firebase
    //   .firestore()
    //   .collection('containers')
    //   .onSnapshot((snapshot) => {
    //     setData(snapshot.docs.map((doc) => doc.data()));
    // });
  }, [setData, firebase]);
  // console.log(data);
  // return data;
  // }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      {/* <p className="text-3xl font-roboto text-center text-black my-4 mx-8 self-start">{`${user.displayName}`}</p> */}
      <div className="grid grid-cols-2">
        <div className="min-h-72 w-2/3 bg-blue-300 rounded-md m-10 p-3">
          Past Projects:
        </div>
        <div className="m-10 w-2/5 grid grid-rows-2 justify-end">
          <div>
            <button
              className=" w-32 bg-blue-300 hover:bg-blue-400 rounded-md"
              onClick={() => console.log(data)}
            >
              Let's Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
