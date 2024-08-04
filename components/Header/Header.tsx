import { House, LogIn, MessageCircleMore, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/lib/contexts/AuthContext";

const Header = () => {
  return (
    <nav className="flex justify-between items-center px-7 py-3 border-b">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </Link>
      <ul className="flex space-x-5">
        <li className="flex items-center gap-2">
          <Link href="/">
            <House />
            Home
          </Link>
        </li>

        <li className="flex items-center gap-2">
          <Link href="/categories">
            <Newspaper />
            Categories
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Link href="/contact">
            <MessageCircleMore />
            Contact
          </Link>
        </li>
      </ul>
      <AuthContextProvider>
        <LoginButton />
      </AuthContextProvider>
    </nav>
  );
};

export default Header;
