// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXVV4buqFs-6roqkCIllFR5C2WWf6M6qk",
  authDomain: "social-media-app-4e6f5.firebaseapp.com",
  projectId: "social-media-app-4e6f5",
  storageBucket: "social-media-app-4e6f5.appspot.com",
  messagingSenderId: "816212988786",
  appId: "1:816212988786:web:0dec8c6471ae9c9dd803eb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
