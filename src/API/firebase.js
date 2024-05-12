import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCBomrUGSVE2YwbyP29T0nEZkHz2SG95MI",
    authDomain: "notes-e3598.firebaseapp.com",
    projectId: "notes-e3598",
    storageBucket: "notes-e3598.appspot.com",
    messagingSenderId: "3059685279",
    appId: "1:3059685279:web:d60af7981a7b625a378faa"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);