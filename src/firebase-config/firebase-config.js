import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA5oiMRWYDLoAWEJNQjblPnjV64TcjwGE8",
  authDomain: "event-calendar-96f71.firebaseapp.com",
  projectId: "event-calendar-96f71",
  storageBucket: "event-calendar-96f71.appspot.com",
  messagingSenderId: "192765244619",
  appId: "1:192765244619:web:bd10baa466b948a389574e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);