import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAzdRD0MOvBUOfJIOfGjTyRer6esVg5wt4",
  authDomain: "chatapp-ef020.firebaseapp.com",
  projectId: "chatapp-ef020",
  storageBucket: "chatapp-ef020.appspot.com",
  messagingSenderId: "821875886336",
  appId: "1:821875886336:web:97bd426700440b79018be5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);