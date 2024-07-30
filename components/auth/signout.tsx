"use client";

import { signOut } from "next-auth/react";

export default function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-full" onClick={() => signOut()}>
      {children}
    </button>
  );
}
