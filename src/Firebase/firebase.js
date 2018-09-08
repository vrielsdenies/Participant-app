// firebase.js: The file where all the configuration goes that you have
// seen previously on your Firebase dashboard. In addition,
// Firebase itself will be instantiated in this file.

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAqgm24etwAfb2OdC3s03cn_eMA-SEgRTM",
  authDomain: "odoo-31cc6.firebaseapp.com",
  databaseURL: "https://odoo-31cc6.firebaseio.com",
  projectId: "odoo-31cc6",
  storageBucket: "odoo-31cc6.appspot.com",
  messagingSenderId: "911518276896"
};

var admin = require("firebase-admin");

var serviceAccount = require("../odoo-31cc6-firebase-adminsdk-kg92z-df702ea069.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://odoo-31cc6.firebaseio.com"
});

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
