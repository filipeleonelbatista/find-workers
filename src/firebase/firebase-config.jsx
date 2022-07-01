import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIukEWtjaORwK58fY1lWT73PBh7cqcVRk",
  authDomain: "jobsworker-b4b7e.firebaseapp.com",
  projectId: "jobsworker-b4b7e",
  storageBucket: "jobsworker-b4b7e.appspot.com",
  messagingSenderId: "9317007675",
  appId: "1:9317007675:web:03df11acbbde5c457db71e",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
