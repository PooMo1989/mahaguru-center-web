"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
    >
      Sign out
    </button>
  );
}
