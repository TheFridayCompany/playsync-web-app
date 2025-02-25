"use client";
import useAuth from "@/app/features/auth/presentation/hooks/useAuth";

export default function Login() {
  const { signIn } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
}
