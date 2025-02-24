"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/features/auth/presentation/hooks/useAuth";

export default function Login() {
  const { user, isLoggedIn, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push("/home"); // Redirect to home if logged in
    } else if (!loading && !isLoggedIn) {
      router.push("/login"); // Stay on login page if not logged in
    }
  }, [loading, isLoggedIn, router]);

  const handleSignIn = async (): Promise<void> => {
    try {
      await signInWithGoogle(); // Calls the sign-in logic from the useAuth hook
    } catch (error) {
      console.error("Error signing in: ", error);
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
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <p>Welcome, {user.displayName}</p>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}
