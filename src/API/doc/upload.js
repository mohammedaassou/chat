import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";


const handleUpload = (file, setProgress, id) => {
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
  


// const App = () => {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [url, setUrl] = useState("");

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };


//   const handleUpload = (file , setProgress) => {
//     if (file) {
//       const storageRef = ref(storage, `images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setProgress(progress);
//         },
//         (error) => {
//           console.error("Upload failed", error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setUrl(downloadURL);
//           });
//         }
//       );
//     }

    
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <div>Upload Progress: {progress}%</div>
//       {url && <div>Image URL: <a href={url}>{url}</a></div>}
//     </div>
//   );
// };


export default handleUpload;
