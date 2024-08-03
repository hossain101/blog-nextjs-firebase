
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createNewAuthor, deleteAuthor, updateAuthor } from "../firebase/author/write";
import { getAuthor } from "../firebase/author/read";

export interface AuthorFormContextType {
  data: Record<string, string>;
  isLoading: boolean;
  error: null | string;
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

const AuthorFormContext = createContext<AuthorFormContextType | undefined>(undefined);

const AuthorFormContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateAuthorId = searchParams.get("id");

  const [data, setData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleData = (key: string, value: string) => {
    setIsDone(false);
    setData({ ...data, [key]: value });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      if (!data || !image) {
        throw new Error("Data or image is missing");
      }
      await createNewAuthor(data, image);
      setIsDone(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      if (!data || !image) {
        throw new Error("Data or image is missing");
      }
      await updateAuthor(data, image);
      setIsDone(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
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
      setError(error instanceof Error ? error.message : "An unknown error occurred");
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
      setError(error instanceof Error ? error.message : "An unknown error occurred");
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
      {children}
    </AuthorFormContext.Provider>
  );
};

export const useAuthorForm = () => useContext(AuthorFormContext);

export default AuthorFormContextProvider;
