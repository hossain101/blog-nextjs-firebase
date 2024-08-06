'use client'
import Sidebar from "@/components/AdminComponents/Sidebar";
import AuthContextProvider, { useAuth } from "@/lib/contexts/AuthContext";
import { useAdmin } from "@/lib/firebase/admin/read";

import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  


  return (
    <>
      <AuthContextProvider>
      
        <InnerLayout>{children}</InnerLayout>
          
      
      </AuthContextProvider>
    </>
  );
};


const InnerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authContext = useAuth();

  const admin = authContext?.user;
  const authIsLoading = authContext?.isLoading;
  const { data: adminData, isLoading, error } = useAdmin({ uid: admin?.uid! });

 


  if (authIsLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    
    <section className="flex">
    <Sidebar />
    {children}
  </section>
  );
};

export default Layout;
