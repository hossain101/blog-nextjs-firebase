"use client";
import AuthorFormContextProvider from "@/lib/contexts/AuthorFormContext";

import React, { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthorFormContextProvider>
          <section className="flex">{children}</section>
        </AuthorFormContextProvider>
      </Suspense>
    </>
  );
};

export default Layout;
