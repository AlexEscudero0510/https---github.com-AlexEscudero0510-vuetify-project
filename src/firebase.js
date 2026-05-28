// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCFpVeo9asltpqSunfF8H7jGHIu7BJIPXk",
  authDomain: "ids1-953e3.firebaseapp.com",
  projectId: "ids1-953e3",
  storageBucket: "ids1-953e3.firebasestorage.app",
  messagingSenderId: "423471121083",
  appId: "1:423471121083:web:150ca4e3b4402114751f9e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// AUTH
export const auth = getAuth(app)

// FIRESTORE
export const db = getFirestore(app)