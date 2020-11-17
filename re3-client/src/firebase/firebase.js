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
    await docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          snippet = doc.data().currentSnippet;
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
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
    if (isNaN(rating) || this.currentSnippet >= 101) {
      return;
    }
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
}
