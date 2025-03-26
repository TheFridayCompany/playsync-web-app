"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-4 flex flex-col h-full">
      {/* Logo or Branding */}
      <div className="text-2xl font-bold mb-8">
        <span className="text-green-400">PlaySync</span>
      </div>

      {/* Sidebar Links */}
      <nav>
        <ul className="space-y-6">
          <li>
            <Link href="/home" className="flex items-center space-x-2 text-lg">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/home/search"
              className="flex items-center space-x-2 text-lg"
            >
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link
              href="/home/playlists"
              className="flex items-center space-x-2 text-lg"
            >
              <span>Your Playlists</span>
            </Link>
          </li>
          <li>
            <Link
              href="/home/social"
              className="flex items-center space-x-2 text-lg"
            >
              <span>Friends</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
