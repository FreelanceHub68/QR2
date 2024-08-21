const { getAuth } = require('@firebase/auth');
const { getFirestore, collection } = require('firebase/firestore');

//firebase config
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore'); // or 'firebase/database' for Realtime Database
require('dotenv').config();


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.FIREBASE_APP_ID ,
    measurementId:process.env.FIREBASE_MESSAGEING_ID
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app); 

const auth= getAuth(app)

const Product = collection(db, "Product");

const Cart= collection(db,"Cart");

const Table=collection(db,"Table");

module.exports={db,auth,Table,Product,Cart};

