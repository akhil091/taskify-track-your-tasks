import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArCOjTHjtEbjwhzG8R6Nopw931E931g38",
  authDomain: "taskify-2bbc9.firebaseapp.com",
  projectId: "taskify-2bbc9",
  storageBucket: "taskify-2bbc9.appspot.com",
  messagingSenderId: "202796476102",
  appId: "1:202796476102:web:f55dbe2dd91f94089c19c7",
  measurementId: "G-PS4L0XQWFS"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
provider.addScope("email");
provider.addScope("profile");

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
