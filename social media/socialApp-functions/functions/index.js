const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./key/admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://socialapp-e2b66.firebaseio.com'
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello Word!');
});

exports.getScreams = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection('screams')
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push(doc.data());
      });
      return res.json(screams);
    })
    .catch(err => console.error(err));
});

exports.createScream = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed!' });
  }
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin
    .firestore()
    .collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({ message: `Document ${doc.id} created successfully!` });
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong!' });
      console.error(err);
    });
});
