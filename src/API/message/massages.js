import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";

const messageRef = collection(db, "messages");

const messages = async (setCurrentMessages ,userSentID ,userToSentID  ) => {
  if(!userSentID  || !userToSentID) return;
  try {
    const q = query(messageRef , where("userSentID", "in", [userSentID, userToSentID]), where("userToSentID", "in", [userSentID, userToSentID]), orderBy("timestamp" , "asc")); // Order by timestamp in ascending order
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liste = snapshot.docs.map((doc) => ({
        ...doc.data(),
        idFirebase: doc.id,
      }));
      setCurrentMessages(liste);

    });

    console.log("Subscribed to Firestore changes.");

    // Return unsubscribe function if you want to stop listening to changes later
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};

export default messages;