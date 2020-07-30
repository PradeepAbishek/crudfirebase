import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDCXBR0Qgq_6telnkEW7AzgtkKuxUqLNeA",
  authDomain: "pradeep-r-1.firebaseapp.com",
  databaseURL: "https://pradeep-r-1.firebaseio.com",
  projectId: "pradeep-r-1",
  storageBucket: "pradeep-r-1.appspot.com",
  messagingSenderId: "493319827496",
  appId: "1:493319827496:web:e34a682d153eec938f851d",
  measurementId: "G-0STGWT5QJG"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users');
const studentsCollection = db.collection('students');

// export utils/refs
export {
  firebase,
  db,
  auth,
  usersCollection,
  studentsCollection,
}