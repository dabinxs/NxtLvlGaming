import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeBub7WEOJFvJ37xEm-0qFwudyb4JKJro",
  authDomain: "nextlevelgaming-events.firebaseapp.com",
  projectId: "nextlevelgaming-events",
  storageBucket: "nextlevelgaming-events.firebasestorage.app",
  messagingSenderId: "670541473455",
  appId: "1:670541473455:web:9104c24961c119ef71d65a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

