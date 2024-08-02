"use client";
import React, { createContext, ReactNode, Suspense, useContext, useState } from "react";
import {
  createNewCategory,
  deleteCategory,
  updateCategory,
} from "../firebase/category/write";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategory } from "../firebase/category/read";

export interface CategoryFormContextType {
  data: Record<string, string>;
  isLoading: boolean;
  error: null | string; // Adjust according to your error handling strategy
  handleCreate: () => Promise<void>;
  handleData: (key: string, value: string) => void;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  isDone: boolean;
  updateCategoryId: string | null;
  fetchData: (id: string) => Promise<void>;
  handleUpdate: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

const CategoryFormContext = createContext<CategoryFormContextType | undefined>(
  undefined
);

const CategoryFormContextProvider = ({ children }: { children: ReactNode }) => {
  //router
  const router = useRouter();
  //use states
  const searchParams = useSearchParams();
  const updateCategoryId = searchParams.get("id");

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
      await createNewCategory(data!, image!);
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
      await updateCategory(data!, image!);
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
      await deleteCategory(id);
      setIsDone(true);
      router.push("/admin/categories");
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
      const response = await getCategory(id);
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
    <CategoryFormContext.Provider
      value={{
        data,
        isLoading,
        error,
        handleCreate,
        handleData,
        image,
        setImage,
        isDone,
        updateCategoryId,
        fetchData,
        handleUpdate,
        handleDelete,
      }}
    >
      <Suspense>{children}</Suspense>
    </CategoryFormContext.Provider>
  );
};

export const useCategoryForm = () => useContext(CategoryFormContext);

export default CategoryFormContextProvider;
