// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLJ-T6fG-OdbhKnTsi7TJbxEFHuDogclQ",
  authDomain: "tourism-app-fd662.firebaseapp.com",
  projectId: "tourism-app-fd662",
  storageBucket: "tourism-app-fd662.firebasestorage.app",
  messagingSenderId: "924499542856",
  appId: "1:924499542856:web:b489048bbdea62efc2297d",
  measurementId: "G-4HQBJDTFC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;