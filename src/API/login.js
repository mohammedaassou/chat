import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";





  const onLogin = (email , password ) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
     
        // return user
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
   
}

export default onLogin