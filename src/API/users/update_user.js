

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


// Function to update an item in Firestore
const updateUser = async (id, newData) => {
  try {
    const ref = doc(db, "users", id); // Reference to the document to update
    await updateDoc(ref, newData); // Update the document with new data
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
    
  }
};

export default updateUser;

















