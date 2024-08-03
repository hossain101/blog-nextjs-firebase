'use client';
import PostFormContextProvider from "@/lib/contexts/PostFormContext";
import React, { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PostFormContextProvider>
          <section className="flex">{children}</section>
        </PostFormContextProvider>
      </Suspense>
    </>
  );
};

export default Layout;
