
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyB4qGXOZCAHnslu8iVskS_xn5ztSG7D8vc",
  authDomain: "threestep-fa3bc.firebaseapp.com",
  projectId: "threestep-fa3bc",
  storageBucket: "threestep-fa3bc.firebasestorage.app",
  messagingSenderId: "205574848033",
  appId: "1:205574848033:web:235f8608af726974da6d60"
};

// Initialize Firebase
// export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIRESTORE = getFirestore(FIREBASE_APP);
// export const AUTH = getAuth(FIREBASE_APP);

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage
const AUTH = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const FIRESTORE = getFirestore(app);

export { AUTH, FIRESTORE };