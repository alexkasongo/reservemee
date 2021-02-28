import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: '**********',
    authDomain: '**********',
    databaseURL: '**********',
    projectId: '**********',
    storageBucket: '**********',
    messagingSenderId: '**********',
    appId: '**********',
    measurementId: '**********'
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
