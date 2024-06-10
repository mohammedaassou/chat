import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";






export const signInWithEmailPassword = (email, password) => {
      return  createUserWithEmailAndPassword(auth, email, password);
  };