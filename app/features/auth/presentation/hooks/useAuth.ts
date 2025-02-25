import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth.slice";
import { container } from "@/app/common/di/container";
import IAuthService from "../../domain/interfaces/auth.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const authService = container.get<IAuthService>(SYMBOLS.IAuthService);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/home");
    }
  }, [user]);

  const restoreSignIn = async () => {
    console.log("restore sign in called");
    setLoading(true);
    try {
      const currentUser = await authService.restoreLogin();
      console.log(JSON.stringify(currentUser));
      if (currentUser) dispatch(login(currentUser));
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const user = await authService.login();
      dispatch(login(user)); // Dispatch the login action with the user
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
      dispatch(logout());
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
    signIn,
    signOut,
    restoreSignIn,
  };
};

export default useAuth;
