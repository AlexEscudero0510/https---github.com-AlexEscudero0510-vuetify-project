// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFpVeo9asltpqSunfF8H7jGHIu7BJIPXk",
  authDomain: "ids1-953e3.firebaseapp.com",
  projectId: "ids1-953e3",
  storageBucket: "ids1-953e3.firebasestorage.app",
  messagingSenderId: "423471121083",
  appId: "1:423471121083:web:150ca4e3b4402114751f9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);