"use client";
import Link from "next/link";

export default function Landing() {
  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/home">Home</Link>
    </div>
  );
}
