// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDERKW3Q-1-AF1fdmHlBpDdiL22ExlTh-I",
  authDomain: "cmsc21-blog.firebaseapp.com",
  projectId: "cmsc21-blog",
  storageBucket: "cmsc21-blog.appspot.com",
  messagingSenderId: "1094369698086",
  appId: "1:1094369698086:web:b1bafd9dae645d752161e7",
  measurementId: "G-HMQ8GRGSG2"
};

// Initialize Firebase

// if (!firebase.getApp.length) {
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

export const firebaseAuth = getAuth(firebaseApp);

export function getFirebaseUser() {
  return useAuthState(firebaseAuth);
}
// const analytics = getAnalytics(firebaseApp);
// const auth = getAuth(firebaseApp);
// }
