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
  apiKey: "AIzaSyCxIO-J2U5ncaJvso0Hgp1tzsqdvW6YHm8",
  authDomain: "qr-app-222d2.firebaseapp.com",
  projectId: "qr-app-222d2",
  storageBucket: "qr-app-222d2.appspot.com",
  messagingSenderId: "371248608800",
  appId: "1:371248608800:web:a0793aa08abf6f1243ee45",
  measurementId: "G-6BBN7Q9PLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const storage = getStorage(app);
// export const db = getFirestore(app);