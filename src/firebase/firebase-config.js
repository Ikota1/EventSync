import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdUvQX7adFTAGQTKylxfKOTCvLLFQfxsg",
  authDomain: "eventsync-1.firebaseapp.com",
  databaseURL: "https://eventsync-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eventsync-1",
  storageBucket: "eventsync-1.appspot.com",
  messagingSenderId: "279476340668",
  appId: "1:279476340668:web:90abfb95a53c13321f4db9"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
