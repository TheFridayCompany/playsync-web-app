"use client";
import Link from "next/link";
import { isMobile } from "react-device-detect";

export default function Landing() {
  if (isMobile) return <p>We do not support mobile browsers yet</p>;

  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/home">Home</Link>
    </div>
  );
}
