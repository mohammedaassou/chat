import { onSnapshot, collection, query, orderBy, where} from "firebase/firestore";
import { db } from "../firebase";

const messageRef = collection(db, "users");

const getFriends = async (setusers, amisIds) => {
  const uids = Array.from(amisIds ?? []);

  if (uids.length > 0) {
    try {
      const q = query(
        messageRef,
        where("uid", "in", uids),
        orderBy("name", "asc"), // Order by name if you still want this
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const liste = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setusers(liste);
      });

      console.log("Subscribed to Firestore changes.");

      // Return unsubscribe function if you want to stop listening to changes later
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  } else {
    console.log("empty array uid friends");
  }
};

export default getFriends;
