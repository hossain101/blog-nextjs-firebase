// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: 'AIzaSyCmZC8gONvx_2UEERJ0hgQL0jCDK4w1KQY',
  authDomain: "blog-tutorial-firebase.firebaseapp.com",
  projectId: "blog-tutorial-firebase",
  storageBucket: "blog-tutorial-firebase.appspot.com",
  messagingSenderId: "782412734566",
  appId: "1:782412734566:web:1eea35fee4e1b2b55f8da7",
  measurementId: "G-E0KK0M2C8H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const imgDB = getStorage(app);
