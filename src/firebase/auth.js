import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
