import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const getUser = async  (uid) =>{
    try {
      // Reference the users collection
      const usersRef = collection(db, 'users');
      // Create a query against the collection
      const q = query(usersRef, where("uid", "==", uid));
      // Execute the query
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Assuming uid is unique and you get exactly one document
        const userDoc = querySnapshot.docs[0];
        return userDoc;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  export default getUser