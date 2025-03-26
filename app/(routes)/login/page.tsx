"use client";
import useAuth from "@/app/features/auth/presentation/hooks/useAuth";
import { useSelector } from "react-redux";
import SignInWithGoogleButton from "@/app/components/buttons/SignInWithGoogleButton";
import CreateAccountForm from "@/app/components/forms/CreateAccountForm";

export default function Login() {
  const { signIn } = useAuth();
  const { profile } = useSelector((state: any) => state.profile);
  const { user } = useSelector((state: any) => state.auth);

  if (user && !profile) return <CreateAccountForm />;

  return (
    <div className="max-w-sm mx-auto p-4">
      <SignInWithGoogleButton onClick={signIn} />
    </div>
  );
}
