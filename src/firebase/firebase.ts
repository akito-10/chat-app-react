import firebase from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
