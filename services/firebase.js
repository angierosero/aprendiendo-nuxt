import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/auth'
var config = {
  apiKey: "AIzaSyBhnoZmkD_B7FrRyPwrWVLQBDkCDmxl64g",
  authDomain: "home-proyect-6e7e1.firebaseapp.com",
  databaseURL: "https://home-proyect-6e7e1.firebaseio.com",
  projectId: "home-proyect-6e7e1",
  storageBucket: "home-proyect-6e7e1.appspot.com",
  messagingSenderId: "381952217796"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore()
const storage = firebase.storage().ref()
const auth = firebase.auth()
export default firebase
export { db, storage,auth }