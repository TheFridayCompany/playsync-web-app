import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_TZjJtHpKkiS2IRp0KLt1wuMiBMeTa-I",
  authDomain: "playsync-3b70c.firebaseapp.com",
  projectId: "playsync-3b70c",
  storageBucket: "playsync-3b70c.firebasestorage.app",
  messagingSenderId: "59380120510",
  appId: "1:59380120510:web:7f49a58f755115bb5417ef",
  measurementId: "G-S5HC85LFCN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup, signOut };
