import Sidebar from "@/components/AdminComponents/Sidebar";
import AuthContextProvider from "@/lib/contexts/AuthContext";

import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthContextProvider>
        <section className="flex">
          <Sidebar />
          {children}
        </section>
      </AuthContextProvider>
    </>
  );
};

export default Layout;
