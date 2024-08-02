"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Suspense,
} from "react";
import {
  createNewAuthor,
  deleteAuthor,
  updateAuthor,
} from "../firebase/author/write";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuthor } from "../firebase/author/read";

export interface AuthorFormContextType {
  data: Record<string, string>;
  isLoading: boolean;
  error: null | string; // Adjust according to your error handling strategy
  handleCreate: () => Promise<void>;
  handleData: (key: string, value: string) => void;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  isDone: boolean;
  updateAuthorId: string | null;
  fetchData: (id: string) => Promise<void>;
  handleUpdate: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

const AuthorFormContext = createContext<AuthorFormContextType | undefined>(
  undefined
);

const AuthorFormContextProvider = ({ children }: { children: ReactNode }) => {
  //router
  const router = useRouter();
  //use states
  const searchParams = useSearchParams();
  const updateAuthorId = searchParams.get("id");

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = React.useState<null | string>(null);
  const [image, setImage] = React.useState<File | null>(null);

  const handleData = (key: string, value: string) => {
    setIsDone(false);
    setData({ ...data, [key]: value });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewAuthor(data!, image!);
      setIsDone(true);
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
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateAuthor(data!, image!);
      setIsDone(true);
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
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteAuthor(id);
      setIsDone(true);
      router.push("/admin/authors");
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

  const fetchData = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getAuthor(id);
      if (response.exists()) {
        setData(response.data());
      }
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
    <AuthorFormContext.Provider
      value={{
        data,
        isLoading,
        error,
        handleCreate,
        handleData,
        image,
        setImage,
        isDone,
        updateAuthorId,
        fetchData,
        handleUpdate,
        handleDelete,
      }}
    >
      <Suspense>{children}</Suspense>
    </AuthorFormContext.Provider>
  );
};

export const useAuthorForm = () => useContext(AuthorFormContext);

export default AuthorFormContextProvider;
