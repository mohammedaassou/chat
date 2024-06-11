

import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";

const messageRef = collection(db, "users");

const getUsers = async (setusers , cureentUser) => {
  try {
    const q = query(
      messageRef,
      where("email" , "!=",  cureentUser.email),
      orderBy("name" , "asc"),
    );
    // Order by timestamp in ascending order
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liste = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(liste) ;
      setusers(liste);
    });

    // console.log("Subscribed to Firestore changes.");

    // Return unsubscribe function if you want to stop listening to changes later
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};

export default getUsers;