const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./key/admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://socialapp-e2b66.firebaseio.com'
});

const express = require('express');
const app = express();

const config = {
  apiKey: 'AIzaSyAc-ZPkAC_6QMYQLJAO8S9xt9x-JkM68t8',
  authDomain: 'socialapp-e2b66.firebaseapp.com',
  databaseURL: 'https://socialapp-e2b66.firebaseio.com',
  projectId: 'socialapp-e2b66',
  storageBucket: 'socialapp-e2b66.appspot.com',
  messagingSenderId: '457251170436',
  appId: '1:457251170436:web:48b807df170aab6d6ebad1',
  measurementId: 'G-FYKQQMT7P0'
};

const firebase = require('firebase');
firebase.initializeApp(config);
const db = admin.firestore();

app.get('/screams', (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount
        });
      });
      return res.json(screams);
    })
    .catch(err => console.error(err));
});

app.post('/scream', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  db.collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({ message: `Document ${doc.id} created successfully!` });
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong!' });
      console.error(err);
    });
});

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ handle: 'this handle is already taken!' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use!' });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.region('europe-west1').https.onRequest(app);
