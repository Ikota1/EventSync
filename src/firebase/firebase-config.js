import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA5oiMRWYDLoAWEJNQjblPnjV64TcjwGE8",
  authDomain: "event-calendar-96f71.firebaseapp.com",
  databaseURL: "https://event-calendar-96f71-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "event-calendar-96f71",
  storageBucket: "event-calendar-96f71.appspot.com",
  messagingSenderId: "192765244619",
  appId: "1:192765244619:web:bd10baa466b948a389574e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);