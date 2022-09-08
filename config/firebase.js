// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJgwiH1eQVzUl0_XzAOAJEhUBbRPYcw28",
  authDomain: "fir-auth-18eec.firebaseapp.com",
  projectId: "fir-auth-18eec",
  storageBucket: "fir-auth-18eec.appspot.com",
  messagingSenderId: "1020811750113",
  appId: "1:1020811750113:web:0650ff89a83aafcec1a5a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}