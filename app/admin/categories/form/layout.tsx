'use client';
import CategoryFormContextProvider from "@/lib/contexts/CategoryFormContext";
import React, { Suspense } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryFormContextProvider>
          <section className="flex">{children}</section>
        </CategoryFormContextProvider>
      </Suspense>
    </>
  );
};

export default Layout;
