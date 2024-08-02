//Create new category

import { db, imgDB } from "@/lib/firebase";

import {
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

export const createNewCategory = async (
  data: Record<string, string>,
  image: File
) => {
  if (!data?.name) {
    throw new Error("Category Name is required");
  }
  if (!data?.slug) {
    throw new Error("Category Slug is required");
  }
  if (!image) {
    throw new Error("Category Image is required");
  }

  const imageRef = storageRef(imgDB, `categories/${data.slug}`);
  await uploadBytes(imageRef, image!);

  const imageURL = await getDownloadURL(imageRef);

  const categoryRef = doc(db, `categories/${data.slug}`);

  await setDoc(categoryRef, {
    ...data,
    id: data?.slug,
    Timestamp: Timestamp.now(),
    iconUrl: imageURL,
  });
};

export const updateCategory = async (
  data: Record<string, string>,
  image?: File // Made optional since it's not strictly necessary for the operation
) => {
  if (!data?.name) {
    throw new Error("Category Name is required");
  }
  if (!data?.slug) {
    throw new Error("Category Slug is required");
  }

  let imageURL = data?.iconUrl;

  if (image) {
    try {
      const imageRef = storageRef(imgDB, `categories/${data.slug}`);
      await uploadBytes(imageRef, image);
      imageURL = await getDownloadURL(imageRef); // Renamed variable to avoid shadowing
    } catch (error) {
      console.error("Failed to upload image:", error);
      // Handle error appropriately, possibly rethrow or return early
    }
  }

  const categoryRef = doc(db, `categories/${data.id}`);

  await updateDoc(categoryRef, {
    ...data,
    Timestamp: Timestamp.now(), // Assuming Timestamp is imported correctly
    iconUrl: imageURL,
  });
};

export const deleteCategory = async (id: string) => {
  if (!id) {
    throw new Error("Category ID is required");
  }
  const categoryRef = doc(db, `categories/${id}`);
  await deleteDoc(categoryRef);
};
