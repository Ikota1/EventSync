import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

//DEPRECATED FIREBASE CONFIG - EXCEEDED RL DB USAGE
// const firebaseConfig = {
//   apiKey: "AIzaSyA5oiMRWYDLoAWEJNQjblPnjV64TcjwGE8",
//   authDomain: "event-calendar-96f71.firebaseapp.com",
//   databaseURL: "https://event-calendar-96f71-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "event-calendar-96f71",
//   storageBucket: "event-calendar-96f71.appspot.com",
//   messagingSenderId: "192765244619",
//   appId: "1:192765244619:web:bd10baa466b948a389574e"
// };


//NEW FIRABASE CONFIG - 23/09/04
const firebaseConfig = {
  apiKey: "AIzaSyCdUvQX7adFTAGQTKylxfKOTCvLLFQfxsg",
  authDomain: "eventsync-1.firebaseapp.com",
  databaseURL: "https://eventsync-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eventsync-1",
  storageBucket: "eventsync-1.appspot.com",
  messagingSenderId: "279476340668",
  appId: "1:279476340668:web:90abfb95a53c13321f4db9"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
