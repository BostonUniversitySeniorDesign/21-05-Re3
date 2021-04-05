import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import {useEffect,useState} from 'react'

export default class Firebase {
  constructor() {
    app.initializeApp({
      apiKey: 'AIzaSyDm7t3kFLtOriXhZyOOJReon1qnuubUbvE',
      authDomain: 're3-fb.firebaseapp.com',
      databaseURL: 'https://re3-fb.firebaseio.com',
      projectId: 're3-fb',
      storageBucket: 're3-fb.appspot.com',
      messagingSenderId: '121193880841',
      appId: '1:121193880841:web:7d662547f9bbf78df487d8'
    });
    this.auth = app.auth;
    this.db = app.firestore();
    this.storage = app.storage();
    this.currentSnippet = 1;
    this.snippets = {};
    this.ratings = {};
    this.folderName = 'gs://re3-fb.appspot.com/snippets';
    this.userOnboarded = false;
    this.maxSnippet = 101; //currently 4 but need to change to 100
    this.currentProjectDoc = '';
  }

  isAuthenticated = async () => {
    const user = this.auth().currentUser;
    return user == null ? false : true;
  };

  isOnboarded = async () => {
    const user = this.auth().currentUser;
    if (user == null) {
      return;
    }
    const ref = this.db.collection('users').doc(user.uid);
    const exists = (await ref.get()).exists;
    return exists;
  };

  getUserData = async () => {
    const user = this.auth().currentUser;
    if (user == null) {
      return;
    }
    var ref = this.db.collection('users').doc(user.uid);
    let currentSnippetx = await ref
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return [doc.data().currentSnippet, doc.data().ratings];
        } else {
          return -1;
        }
      })
      .catch(function (error) {
        return -1;
      });
    this.currentSnippet = currentSnippetx[0];
    if (this.currentSnippet === 101) {
      this.currentSnippet = 100;
    }
    this.ratings = currentSnippetx[1];
    if (this.ratings === undefined) {
      this.ratings = {};
    }
    return this.currentSnippet;
  };

  getCurrentSnippet = async () => {
    return this.currentSnippet;
  };

  googleSignIn = async () => {
    try {
      const provider = new this.auth.GoogleAuthProvider();
      await this.auth().signInWithPopup(provider);
      return;
    } catch (err) {
      return;
    }
  };

  // Upload name, email, experience to firestore
  submitOnboarding = async (currentUserInfo) => {
    const user = this.auth().currentUser;
    const ref = this.db.collection('users').doc(user.uid);
    console.log(currentUserInfo);
    const res = await ref
      .set({
        name: user.displayName,
        gender: currentUserInfo.gender,
        email: user.email,
        background: currentUserInfo.background,
        experience: currentUserInfo.experience,
        isOnboarded: true,
        currentSnippet: 1,
        courses: currentUserInfo.courses,
        familiarWithR: currentUserInfo.familiarWithR
      })
      .then(() => {
        return 1;
      })
      .catch((error) => {
        return -1;
      });
    return res;
  };

  signOut = async () => {
    this.auth().signOut();
  };

  authSubscriber = (callback) => {
    return this.auth().onAuthStateChanged(callback);
  };

  UpdatingRatingInUserCollection = async (rating) => {
    if (this.currentSnippet > this.maxSnippet) {
      return;
    } else {
      const user = this.auth().currentUser;
      var currentsnippet = this.currentSnippet;
      var snippetString = 'snippet' + currentsnippet.toString();
      console.log(snippetString);
      this.db
        .collection('users')
        .doc(user.uid)
        .set(
          {
            [snippetString]: rating
          },
          { merge: true }
        )
        .then(function () {
          console.log(
            'document ',
            snippetString,
            ' with submitted rating ',
            rating
          );
        })
        .catch(function (error) {
          console.log('ok');
        });
    }
  };

  downloadFile = async () => {
    var gsRef = this.storage.refFromURL(
      this.folderName + '/snippet' + this.currentSnippet + '.R'
    );

    gsRef
      .getDownloadURL()
      .then(function (url) {
        window.open(url, '_self');
      })
      .catch(function (error) {
        console.log('error occured');
      });
  };

  // Display the content inside the file after fetching it from the Firebase storage
  DisplayContents = async () => {
    // Get the snippet that the current user last worked on

    var snippet = this.currentSnippet;

    // Get the snippet from storage to display and send it the display file function
    if (snippet in this.snippets) {
      return this.snippets[snippet];
    } else {
      var gsRef = this.storage.refFromURL(
        this.folderName + '/snippet' + String(snippet) + '.R'
      );
      var url = await gsRef
        .getDownloadURL()
        .then(function (url) {
          return url;
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        });
      let contents = await fetch(url).then((res) => {
        return res.text();
      });
      this.snippets[snippet] = contents;
      return contents;
    }
  };

  addSnippetRating = async (rating) => {
    if (isNaN(rating) || this.currentSnippet >= 101) {
      return;
    }
    // Store rating of snippet
    var currentsnippet = this.currentSnippet;
    var snippetString = 'snippet' + currentsnippet.toString();
    this.ratings[snippetString] = rating;
    this.currentSnippet = currentsnippet + 1;
  };

  decrementSnippetCounter = async () => {
    var snippet = this.currentSnippet;
    if (snippet <= 1) {
      alert('You are on the first snippet.');
      return;
    }
    // decrement current snippet
    this.currentSnippet = snippet - 1;
  };

  // REPRODUCIBILITY
  // {version: version, title: title, name: name, keywords: keywords}
  storeProjectData = async (
    version,
    title,
    name,
    keywords,
    user,
    dataLicense,
    codeLicense,
    scores
  ) => {
    console.log(version);
    console.log(title);
    const ref = this.currentProjectDoc;
    const res = await ref
      .set(
        {
          version: version,
          title: title,
          author: name,
          keywords: keywords,
          userID: user,
          dataLicense: dataLicense,
          codeLicense: codeLicense,
          readability_scores: scores
        },
        { merge: true }
      )
      .then(() => {
        console.log('success, stored - ', scores);
        return 1;
      })
      .catch((error) => {
        return -1;
      });
    return res;
  };
  updateProjectData = async (
    docID,
    version,
    title,
    name,
    keywords,
    codeLicense,
    dataLicense
  ) => {
    // if(codeLicense===undefined)
    //   console.log("there is no code license");
    //   else
    //   console.log(codeLicense);
    const ref = this.db.collection('containers').doc(docID);
    const res = await ref
      .update(
        {
          version: version,
          title: title,
          author: name,
          keywords: keywords,
          codeLicense: codeLicense,
          dataLicense: dataLicense
        },
        { merge: true }
      )
      .then(() => {
        return 1;
      })
      .catch((error) => {
        return -1;
      });
    return res;
  };

  fetchProjects = async () => {
    const user = this.auth().currentUser;
    const projects = this.db
      .collection('containers')
      .where('userID', '==', `${user.uid}`)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docID: doc.id
        }));
      });

    return projects;
  };
  // DisplayFile = async (docID,filesName) => {
  //   // Get the current userID

  //   var user = this.auth().currentUser;

  //   // Get the snippet from storage to display and send it the display file function
  //     var gsRef = this.storage.refFromURL(
  //       this.folderName + filesName + String(snippet) + '.txt'
  //     );
  //     var url = await gsRef
  //       .getDownloadURL()
  //       .then(function (url) {
  //         return url;
  //       })
  //       .catch(function (error) {
  //         console.error('Error adding document: ', error);
  //       });
  //     let contents = await fetch(url).then((res) => {
  //       return res.text();
  //     });
  //     this.snippets[snippet] = contents;
  //     return contents;
    
  // };
}
