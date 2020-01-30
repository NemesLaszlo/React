const admin = require('firebase-admin');
const serviceAccount = require('../key/admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://socialapp-e2b66.firebaseio.com'
});

const db = admin.firestore();

module.exports = { admin, db };
