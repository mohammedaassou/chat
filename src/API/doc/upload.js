import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";


const handleUpload = (file, id) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storageRef = ref(storage, `images/${id}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // setProgress(progress);
          },
          (error) => {
            console.error("Upload failed", error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      } else {
        reject(new Error("No file provided"));
      }
    });
  };
  



export default handleUpload;
