
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createNewCategory, deleteCategory, updateCategory } from "../firebase/category/write";
import { getCategory } from "../firebase/category/read";

export interface CategoryFormContextType {
  data: Record<string, string>;
  isLoading: boolean;
  error: null | string;
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

const CategoryFormContext = createContext<CategoryFormContextType | undefined>(undefined);

const CategoryFormContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateCategoryId = searchParams.get("id");

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
      await createNewCategory(data, image);
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
      await updateCategory(data, image);
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
      await deleteCategory(id);
      setIsDone(true);
      router.push("/admin/categories");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
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
      setError(error instanceof Error ? error.message : "An unknown error occurred");
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
      {children}
    </CategoryFormContext.Provider>
  );
};

export const useCategoryForm = () => useContext(CategoryFormContext);

export default CategoryFormContextProvider;
