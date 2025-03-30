"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { useProfile } from "@/app/features/profile/presentation/hooks/useProfile.hook";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const {
    loading: isLoadingAuth,
    listenToAuthStateChange,
    exchangeAndSaveToken,
  } = useAuth();
  const { isLoading: isLoadingProfile, checkAndSetProfile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    // Restore sign-in state when the component mounts

    // Listen to changes in authentication state (login/logout)
    const unsubscribe = listenToAuthStateChange((user) => {
      console.log("Auth state changed:", user);
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        console.log("User is logged in:", user);
        console.log("before checking and setting profile");
        exchangeAndSaveToken(user).then(() => {
          checkAndSetProfile().catch((error) => {
            router.push("/login");
          });
        });
      }
    });

    // Clean up listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Combine isLoadingProfile and isLoadingAuth to get a single loading state
  const isLoading = isLoadingAuth || isLoadingProfile;
  console.log("is loading auth state:", isLoadingAuth);
  console.log("is loading profile state:", isLoadingProfile);

  if (isLoading) return <p>Loading...</p>; // Prevent UI flickering during initial load

  return children;
}
