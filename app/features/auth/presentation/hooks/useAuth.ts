import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth.slice";
import { container } from "@/app/common/di/container";
import IAuthService from "../../domain/interfaces/auth.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";

const useAuth = () => {
  const authService = container.get<IAuthService>(SYMBOLS.IAuthService);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const firebaseUser = await authService.getCurrentUser();
        if (firebaseUser) {
          dispatch(login()); // If user is authenticated, update Redux state
        } else {
          dispatch(logout()); // If no user, set logged out state
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        dispatch(logout());
      } finally {
        setLoading(false); // Stop loading once the auth status check is complete
      }
    };

    checkAuthStatus(); // Call the function to check auth status on initial render
  }, [dispatch]);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await authService.login();
      dispatch(login()); // Dispatch the login action with the user
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout()); // Dispatch logout action to update Redux state
    } catch (error) {
      console.error("Error during sign-out:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoggedIn,
    user,
    loading,
    signInWithGoogle,
    signOut,
  };
};

export default useAuth;
