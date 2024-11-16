const admin = require("firebase-admin");
const serviceAccount = require("./firebaseKey.json"); // Path to your key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://car-management-system-f28a9.firebaseio.com", // Replace with your Firestore Database URL
});

const db = admin.firestore();

module.exports = { db };
