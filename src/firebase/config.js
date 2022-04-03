// imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";

// config
const firebaseConfig = {
  apiKey: "AIzaSyC6acqytRpEQ4ACuM3vDi2HIq9OipY9n4M",
  authDomain: "mytodo-b0609.firebaseapp.com",
  projectId: "mytodo-b0609",
  storageBucket: "mytodo-b0609.appspot.com",
  messagingSenderId: "1059161763688",
  appId: "1:1059161763688:web:970ae56cc7876972a070dd",
};

// initialize firebase
initializeApp(firebaseConfig);

// firebase services init
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const timestamp = serverTimestamp();

export { db, auth, storage, timestamp };
