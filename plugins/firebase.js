import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAjtsjs0bT6R9BxvypR1hq1dB1Gq7314GY",
  authDomain: "bookme-7de5a.firebaseapp.com",
  databaseURL: "https://bookme-7de5a.firebaseio.com",
  projectId: "bookme-7de5a",
  storageBucket: "bookme-7de5a.appspot.com",
  messagingSenderId: "712900995493",
  appId: "1:712900995493:web:dec7f1a097c48a8709a04c",
  measurementId: "G-WT6J1JBQ2B"
};
// Initialize Firebase

let app = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

// db will connect to the firestore
export const db = firebase.firestore();

// will be used to connect to realtime database and all the others
export default firebase;

