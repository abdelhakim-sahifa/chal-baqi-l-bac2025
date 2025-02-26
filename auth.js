import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {saveData } from './like.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDdlxEi_sbc2NrjSXt9cP2cDVzJBL_WDY",
    authDomain: "theprojectsofc.firebaseapp.com",
    projectId: "theprojectsofc",
    storageBucket: "theprojectsofc.firebasestorage.app",
    messagingSenderId: "825970426844",
    appId: "1:825970426844:web:35135b5f4071dd5069c519",
    measurementId: "G-E8XJ0KEQNH"
  };
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

// Function to sign in the user anonymously
export const signInAnonymouslyUser = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("Signed in anonymously:", userCredential.user);
    saveData(user.uid)

    return userCredential.user;
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw new Error(error.message);
  }
};

// Function to monitor the auth state and perform actions accordingly
export const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, callback);
};

// Function to sign out the user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error(error.message);
  }
};
