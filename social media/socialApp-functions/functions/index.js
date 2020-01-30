const functions = require('firebase-functions');
const express = require('express');
const app = express();

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signUp, logIn, uploadImage } = require('./handlers/users');
const FirebaseAuth = require('./util/FirebaseAuth');

// Screams routes
app.get('/screams', getAllScreams);
app.post('/scream', FirebaseAuth, postOneScream);
// Users routes
app.post('/signup', signUp);
app.post('/login', logIn);
app.post('/user/image', FirebaseAuth, uploadImage);

exports.api = functions.region('europe-west1').https.onRequest(app);
