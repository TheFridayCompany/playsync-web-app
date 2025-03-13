"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isLoggedIn, restoreSignIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSignIn(); // Restore login state from localStorage

    // Add a small delay to ensure authentication state is checked
    const timeout = setTimeout(() => {
      if (isLoggedIn === false) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        router.push("/home");
      }
      setLoading(false);
    }, 500); // Delay to prevent flickering

    return () => clearTimeout(timeout);
  }, [isLoggedIn, router]);

  if (loading) return <p>Loading...</p>; // Prevent UI flickering

  return children;
}
