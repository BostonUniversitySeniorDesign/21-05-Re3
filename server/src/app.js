const express = require('express');
const http = require('http');

var admin = require('firebase-admin');

var serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://re3-fb.firebaseio.com'
});

const port = process.env.PORT || 4001;

const app = express();

app.get('/', (req, res) => {
  res.send('Hi');
});

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  let allRatings = {};
  let currentSnippet;
  let token = socket.handshake.query.token;
  let authenticated = false;
  let uid;
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      authenticated = true;
      uid = decodedToken.uid;
    })
    .catch((error) => {
      socket.disconnect();
    });

  socket.on('initSnippet', (data) => {
    currentSnippet = data;
  });

  socket.on('rating', (data) => {
    currentSnippet = data.snippetNumber;
    allRatings[`snippet${data.snippetNumber}`] = data.rating;
  });

  socket.on('disconnect', () => {
    if (authenticated && Object.keys(allRatings).length != 0) {
      const ref = admin
        .firestore()
        .collection('users')
        .doc(uid)
        .set(
          { currentSnippet: currentSnippet + 1, ratings: allRatings },
          { merge: true }
        )
        .then(function () {
          console.log('Success');
        })
        .catch(function () {
          console.log('Error');
        });
      return ref;
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
