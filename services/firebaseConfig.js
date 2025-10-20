import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI48AkIsBnraM8f21KfugHen_YiIIPupo",
  authDomain: "react-dashboard-5b9a1.firebaseapp.com",
  projectId: "react-dashboard-5b9a1",
  storageBucket: "react-dashboard-5b9a1.firebasestorage.app",
  messagingSenderId: "675116535762",
  appId: "1:675116535762:web:116d77fb13509391df420b",
  measurementId: "G-5CGF77YYW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Firestore + Storage references
export const db = getFirestore(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);

// Create a storage reference from our storage service
export const storageRef = ref(storage);