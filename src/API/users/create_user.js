





import 'firebase/firestore';
import { db } from '../firebase';
import {
  collection,
  addDoc,serverTimestamp 
} from "firebase/firestore";

const notesCollectionRef = collection(db, "users");

 const CreateUser = async (inputValue) => {

    try {
    var res = await addDoc(notesCollectionRef, {
        uid: inputValue.uid,
        email: inputValue.email,
        username: inputValue.username,
        name: inputValue.name,
        timestamp: serverTimestamp(),
        amis : [],
      });
   
      

      console.log("user created")
     return res;

    } catch (err) {
      console.error(err);
    }
   
  };


export default CreateUser



