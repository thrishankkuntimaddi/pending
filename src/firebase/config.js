import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALUloNt0HWTMeP4IARvRMS9JY-R5_NnFM",
  authDomain: "nistha-passi-core.firebaseapp.com",
  projectId: "nistha-passi-core",
  storageBucket: "nistha-passi-core.firebasestorage.app",
  messagingSenderId: "299692286010",
  appId: "1:299692286010:web:066428f5e01bb51aaa5503",
  measurementId: "G-6KGT340M72",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
