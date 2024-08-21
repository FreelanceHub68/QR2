// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2Hco7RuGriZLTKdis_KfCeLPcehWml40",
  authDomain: "e-comwebsite-40f51.firebaseapp.com",
  projectId: "e-comwebsite-40f51",
  storageBucket: "e-comwebsite-40f51.appspot.com",
  messagingSenderId: "908172406302",
  appId: "1:908172406302:web:4ad233b36f6b69f46ec80f",
  measurementId: "G-9ZNW9KBNFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);