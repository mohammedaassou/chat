


import 'firebase/firestore';
import { db } from '../firebase';
import {
  collection,
  addDoc,serverTimestamp 
} from "firebase/firestore";

const ref = collection(db, "messages");

 const sendMessage = async (message) => {

    try {
    var res = await addDoc(ref, {
        text: message.text,
        userSentID: message.userSentID,
        userToSentID: message.userToSentID,
        timestamp: serverTimestamp(),
      });
    
      console.log("message has sent")
     

    } catch (err) {
      console.error(err);
    }
   
  };


export default sendMessage



