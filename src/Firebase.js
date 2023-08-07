import { initializeApp } from "firebase/app";
import {  getFirestore } from 'firebase/firestore';
import {getAuth , GoogleAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage";
// import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAcKCfKXbXE-rilk4GcFlz7SNyA2DsymT0",
  authDomain: "disneyplus-clone-d2e5a.firebaseapp.com",
  projectId: "disneyplus-clone-d2e5a",
  storageBucket: "disneyplus-clone-d2e5a.appspot.com",
  messagingSenderId: "239106458402",
  appId: "1:239106458402:web:d979c3972a7fe1cf7fdb7b"
};

// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const db = app.firestore();
export const db = getFirestore(app);
const auth = getAuth(app);
// const auth = app.auth();
// const provider = new app.auth.GoogleAuthProvider();
// const storage = app.storage();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;