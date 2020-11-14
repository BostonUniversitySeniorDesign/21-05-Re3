// import app from 'firebase/app';
// import 'firebase/auth';

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

// export default class Firebase {
//   constructor() {
//     app.initializeApp(config);
//     this.auth = app.auth;
//   }

//   isAuthenticated = async () => {
//     const user = await this.auth().currentUser;
//     return user == null ? false : true;
//   };

//   googleSignIn = async () => {
//     try {
//       const provider = new this.auth.GoogleAuthProvider();
//       const result = await this.auth().signInWithPopup(provider);
//       return result;
//     } catch {
//       console.log('auth error');
//     }
//   };

//   isOnboarded = async () => {
//     // Return if user has completed onboarding question. Can maybe be included in googleSignIn?
//     return;
//   };

//   submitOnboarding = async () => {
//     // Upload answer to onboarding question (and other info from google user) to db
//     return;
//   };

//   signOut = async () => {
//     this.auth().signOut();
//   };

//   authSubscriber = (callback) => {
//     return this.auth().onAuthStateChanged(callback);
//   };
// }


import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth;
    this.db = app.firestore();
    this.storage = app.storage();
    this.currentSnippet = 0;
  }

  isAuthenticated = async () => {
    const user = await this.auth().currentUser;
    return user == null ? false : true;
  };

  googleSignIn = async () => {
    try {
      const provider = new this.auth.GoogleAuthProvider();
      const result = await this.auth().signInWithPopup(provider);
      return result;
    } catch {
      console.log('auth error');
    }
  };

  isOnboarded = async () => {
    // Return if user has completed onboarding question. Can maybe be included in googleSignIn?
    return;
  };

  // Upload name, email, experience to firestore 
  submitOnboarding = async (currentAnswer) => {
    var snippet = 0;
    console.log(currentAnswer);
    const user = this.auth().currentUser;
    this.db.collection("users").doc(user.uid).set({
      name: user.displayName,
      experience: currentAnswer,
      email: user.email,
      currentSnippet: snippet
    }, { merge: true })
    .then(function() {
      console.log("Updated ", user.displayName, "'s info on firestore");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    return;
  };

  signOut = async () => {
    this.auth().signOut();
  };

  authSubscriber = (callback) => {
    return this.auth().onAuthStateChanged(callback);
  };

  // addUserDb = async () => {    
  //   const user = await this.auth().currentUser;
  //   this.db.collection("users").doc(user.uid).set({
  //     name: user.displayName
  //   }, { merge: true })
  //   .then(function() {
  //     console.log("Document written with ID: ", user.uid);
  //   })
  //   .catch(function(error) {
  //     console.error("Error adding document: ", error);
  //   });
  // }

  downloadFile = async () => {
    var gsRef = this.storage.refFromURL('gs://re3-fb.appspot.com/doi107910DVN2IT7IF/Disc&PolBehav_ReplicationCode.R')
    gsRef.getDownloadURL().then(function(url) {
      console.log(url);
      window.open(url,"_self");
    }).catch(function(error) {
      console.log("error occured")
    });
  }  
  // Display the content inside the file after fetching it from the Firebase storage
  DisplayContents = async () => {
    var gsRef = this.storage.refFromURL('gs://re3-fb.appspot.com/doi107910DVN2IT7IF/Disc&PolBehav_ReplicationCode.R')
    var url = await gsRef.getDownloadURL().then(function(url) {
      return url;
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
    return fetch(url)
      .then((res) => {return res.text()});
}
}