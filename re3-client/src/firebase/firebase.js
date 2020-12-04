import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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
    this.folderName = 'gs://re3-fb.appspot.com/snippets';
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

  googleSignIn = async () => {
    try {
      const provider = new this.auth.GoogleAuthProvider();
      await this.auth().signInWithPopup(provider);
      return;
    } catch (err) {
      console.log('auth error', err);
    }
  };

  // Upload name, email, experience to firestore
  submitOnboarding = async (answer) => {
    const user = this.auth().currentUser;
    const ref = this.db.collection('users').doc(user.uid);
    const res = await ref
      .set({
        name: user.displayName,
        email: user.email,
        experience: answer,
        isOnboarded: true,
        currentSnippet: 1
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

  downloadFile = async () => {
    var gsRef = this.storage.refFromURL(
      this.folderName + '/snippet' + this.currentSnippet + '.R'
    );

    gsRef
      .getDownloadURL()
      .then(function (url) {
        console.log(url);
        window.open(url, '_self');
      })
      .catch(function (error) {
        console.log('error occured');
      });
  };

  // Display the content inside the file after fetching it from the Firebase storage
  DisplayContents = async () => {
    // Get the snippet that the current user last worked on
    const user = this.auth().currentUser;
    var docRef = this.db.collection('users').doc(user.uid);
    var snippet;
    snippet = await docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data().currentSnippet;
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
    this.currentSnippet = snippet;
    // Get the snippet from storage to display and send it the display file function
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
    return await fetch(url).then((res) => {
      return res.text();
    });
  };

  addSnippetRating = async (rating) => {
    // Store rating of snippet
    var currentsnippet = this.currentSnippet;
    var snippetString = 'snippet' + currentsnippet.toString();
    const user = await this.auth().currentUser;
    this.db
      .collection('ratings')
      .doc(snippetString)
      .set(
        {
          [user.uid]: rating
        },
        { merge: true }
      )
      .then(function () {
        console.log(
          'Rating:',
          rating,
          'added to',
          snippetString,
          'from',
          user.uid
        );
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
        return;
      });
    if (isNaN(rating) || this.currentSnippet >= 100) {
      return;
    }
    // increment current snippet
    currentsnippet = currentsnippet + 1;
    this.db
      .collection('users')
      .doc(user.uid)
      .set(
        {
          currentSnippet: currentsnippet
        },
        { merge: true }
      )
      .then(function () {
        console.log('User currentSnippet updated to', currentsnippet);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
        return;
      });
    this.currentSnippet = currentsnippet;
  };

  decrementSnippetCounter = async () => {
    // Store rating of snippet
    var currentsnippet = this.currentSnippet;
    const user = await this.auth().currentUser;
    if (this.currentSnippet >= 100) {
      return;
    }
    // increment current snippet
    currentsnippet = currentsnippet - 1;
    this.db
      .collection('users')
      .doc(user.uid)
      .set(
        {
          currentSnippet: currentsnippet
        },
        { merge: true }
      )
      .then(function () {
        console.log('User currentSnippet updated to', currentsnippet);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
        return;
      });
    this.currentSnippet = currentsnippet;
  };
}
