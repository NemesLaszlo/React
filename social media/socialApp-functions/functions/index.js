const functions = require('firebase-functions');
const express = require('express');
const app = express();

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream
} = require('./handlers/screams');

const {
  signUp,
  logIn,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser
} = require('./handlers/users');

const FirebaseAuth = require('./util/FirebaseAuth');

// Screams routes
app.get('/screams', getAllScreams);
app.post('/scream', FirebaseAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.post('/scream/:screamId/comment', FirebaseAuth, commentOnScream);
// Users routes
app.post('/signup', signUp);
app.post('/login', logIn);
app.post('/user/image', FirebaseAuth, uploadImage);
app.post('/user', FirebaseAuth, addUserDetails);
app.get('/user', FirebaseAuth, getAuthenticatedUser);

exports.api = functions.region('europe-west1').https.onRequest(app);
