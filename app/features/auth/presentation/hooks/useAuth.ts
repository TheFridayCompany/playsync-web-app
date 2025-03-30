import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth.slice";
import { container } from "@/app/common/di/container";
import IAuthService from "../../domain/interfaces/auth.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import { AuthUser } from "../../domain/entities/auth-user.entity";

const useAuth = () => {
  const authService = container.get<IAuthService>(SYMBOLS.IAuthService);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const exchangeAndSaveToken = async (authUser: AuthUser) => {
    setLoading(true);
    try {
      await authService.exchangeAndSaveToken(authUser.authToken);
    } catch (error) {
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

  const listenToAuthStateChange = (
    callback: (user: AuthUser | null) => void
  ) => {
    return authService.onAuthStateChanged(callback);
  };

  return {
    isLoggedIn,
    user,
    loading,
    listenToAuthStateChange,
    signIn,
    signOut,
    exchangeAndSaveToken,
  };
};

export default useAuth;
