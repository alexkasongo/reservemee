import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDcqcGiVLA7aFauv-N-CqLL8L8h8OiyRAs',
  authDomain: 'nail-salon-b7ffc.firebaseapp.com',
  databaseURL: 'https://nail-salon-b7ffc.firebaseio.com',
  projectId: 'nail-salon-b7ffc',
  storageBucket: 'nail-salon-b7ffc.appspot.com',
  messagingSenderId: '761754596652',
  appId: '1:761754596652:web:03706192a12a1ffaaa2889',
  measurementId: 'G-6XK3MP51YN'
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

