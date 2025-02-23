// Install dependencies: npm install next react firebase @firebase/auth

"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
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
const provider = new GoogleAuthProvider();

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (): Promise<void> => {
    try {
      // await signInWithPopup(auth, provider);
      const result = await signInWithPopup(auth, provider);
      // Get the JWT token
      const token = await result.user.getIdToken();
      console.log("JWT Token:", token);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}
