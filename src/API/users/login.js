import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";





const onLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            return user; // Return the user object
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
           
        });
};

export default onLogin