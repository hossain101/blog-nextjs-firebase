"use client";
import { useAuth } from "@/lib/contexts/AuthContext";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  const auth = useAuth();
  const user = auth?.user;
  const isLoading = auth?.isLoading;
  const error = auth?.error;
  const handleSignInWithGoogle = auth?.handleSignInWithGoogle;
  const handleSignOut = auth?.handleSignOut;

  if (isLoading) return <div>Loading...</div>;

  if (user)
    return (
      <div className="flex items-center  gap-2">
        <Link href={'/admin'} className="flex flex-col items-center">
        <Image className="object-cover rounded-full" src={user?.photoURL!} alt="user-photo" height={50} width={50}  />
        <div>{user?.displayName}</div>
        </Link>
        <button
          onClick={() => {
            handleSignOut!();
          }}
        >
          Logout
        </button>
        
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      <LogIn />
      <button
        onClick={() => {
          handleSignInWithGoogle!();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginButton;
