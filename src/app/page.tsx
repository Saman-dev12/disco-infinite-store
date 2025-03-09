"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div className="flex">  
    {session.data?.user.email}
    <button onClick={() => signIn("discord")}>Login</button>
    <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

