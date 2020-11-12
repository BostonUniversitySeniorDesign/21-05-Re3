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
    this.folderName = 'gs://re3-fb.appspot.com/snippets';
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

  signOut = async () => {
    this.auth().signOut();
  };

  authSubscriber = (callback) => {
    return this.auth().onAuthStateChanged(callback);
  };

  addUserDb = async () => {    
    const user = await this.auth().currentUser;
    this.db.collection("users").doc(user.uid).set({
      name: user.displayName
    }, { merge: true })
    .then(function() {
      console.log("Document written with ID: ", user.uid);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  downloadFile = async () => {
    var gsRef = this.storage.refFromURL('gs://re3-fb.appspot.com/doi107910DVN2IT7IF/Disc&PolBehav_ReplicationCode.R')
    gsRef.getDownloadURL().then(function(url) {
      console.log(url);
      window.open(url,"_self");
    }).catch(function(error) {
      console.log("error occured")
    });
  }  

  // Display the content inside the file after fetching it from the Firebase storage and go get the next snipppet
  DisplayContents = async (num) => {
    // Get the snippet that the current user last worked on
    const user = this.auth().currentUser;
    var docRef = this.db.collection("users").doc(user.uid);
    var snippet;
    await docRef.get().then(function(doc) {
      if (doc.exists) {
          snippet = doc.data().currentSnippet;
      } else {
        console.log("No such document!");
        }
      }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    // Get the next snippet
    snippet = snippet + 1;
    //Save it in a class variable to use it in addSnippetRating
    this.currentSnippet = snippet;
    //Store the current snippet in firestore 
    await docRef.set({
      currentSnippet: snippet
    }, { merge: true })
    .then(function() {
      console.log("Updated ", user.displayName, "'s snippet count on firestore");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    // Get the snippet from storage to display and send it the display file function
    var gsRef = this.storage.refFromURL(this.folderName+'/snippet'+String(snippet)+'.R');
    var url = await gsRef.getDownloadURL().then(function(url) {
      return url;
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
    return await fetch(url)
      .then((res) => {return res.text()});
  }

  addSnippetRating = async (rating) => {
    if(isNaN(rating))
    {
      return;
    }
    var currentsnippet = "snippet"+this.currentSnippet.toString();
    const user = await this.auth().currentUser;
    this.db.collection("ratings").doc(currentsnippet).set({
      [user.uid]: rating
    },{merge: true})
    .then(function() {
      console.log("Rating:",rating, "added to", currentsnippet, "from", user.uid);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
}