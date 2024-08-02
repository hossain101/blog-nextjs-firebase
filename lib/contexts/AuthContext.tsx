'use client';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import React, { createContext, ReactNode, useContext } from "react";
import { auth } from "../firebase";

export interface AuthContextType {
  user: null | User; // Assuming User is the type of your user object
  isLoading: boolean;
  error: null | string; // Adjust according to your error handling strategy
  handleSignInWithGoogle: () => Promise<void>;
  handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Your sign in logic here
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        // Handle cases where error is not an instance of Error
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        // Handle cases where error is not an instance of Error
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, handleSignInWithGoogle, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
