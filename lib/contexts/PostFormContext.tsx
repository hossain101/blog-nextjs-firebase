
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createNewPost, deletePost, updatePost } from "../firebase/posts/write";
import { getPost } from "../firebase/posts/read";

export interface PostFormContextType {
  data: Record<string, string>;
  isLoading: boolean;
  error: null | string;
  handleCreate: () => Promise<void>;
  handleData: (key: string, value: string) => void;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  isDone: boolean;
  updatePostId: string | null;
  fetchData: (id: string) => Promise<void>;
  handleUpdate: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

const PostFormContext = createContext<PostFormContextType | undefined>(undefined);

const PostFormContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updatePostId = searchParams.get("id");

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
      await createNewPost(data, image);
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
      await updatePost(data, image);
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
      await deletePost(id);
      setIsDone(true);
      router.push("/admin/posts");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await getPost(id);
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
    <PostFormContext.Provider
      value={{
        data,
        isLoading,
        error,
        handleCreate,
        handleData,
        image,
        setImage,
        isDone,
        updatePostId,
        fetchData,
        handleUpdate,
        handleDelete,
      }}
    >
      {children}
    </PostFormContext.Provider>
  );
};

export const usePostForm = () => useContext(PostFormContext);

export default PostFormContextProvider;
