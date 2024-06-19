import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const messageRef = collection(db, "users");

const getUser = (uid, setUser) => {
  const q = query(messageRef, where("uid", "==", uid));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const userData = snapshot.docs[0].data();
      setUser({...userData , id : snapshot.docs[0].id});
    } else {
      setUser(null); // Handle case where no user is found
    }
  }, (error) => {
    console.error("Error fetching user: ", error);
  });

  // Return unsubscribe function if you want to stop listening to changes later
  return unsubscribe;
};

export default getUser;
