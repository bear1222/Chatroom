// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqAukjePJQGYXJ4G06Eea--kMdNrnYfWM",
    authDomain: "chatroom-e337c.firebaseapp.com",
    databaseURL: "https://chatroom-e337c-default-rtdb.firebaseio.com",
    projectId: "chatroom-e337c",
    storageBucket: "chatroom-e337c.appspot.com",
    messagingSenderId: "416713594424",
    appId: "1:416713594424:web:a3fd7a04fdc79de44878cd",
    measurementId: "G-Q77L4SLY6D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();
export const storage = getStorage();
