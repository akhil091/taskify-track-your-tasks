import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVGCSaTW98DrHGIdLQPrCpUilOjlA6Us0",
  authDomain: "voosh-assignment-e93d6.firebaseapp.com",
  projectId: "voosh-assignment-e93d6",
  storageBucket: "voosh-assignment-e93d6.appspot.com",
  messagingSenderId: "923824027342",
  appId: "1:923824027342:web:62830bbca9c1bafa26c29f",
  measurementId: "G-CFXEH27C19"
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