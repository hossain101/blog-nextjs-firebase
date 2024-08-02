//Create new post

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

export const createNewPost = async (
  data: Record<string, string>,
  image: File
) => {
  if (!data?.title) {
    throw new Error("Post Name is required");
  }
  if (!data?.slug) {
    throw new Error("Post Slug is required");
  }
  if (!image) {
    throw new Error("Post Image is required");
  }

  const imageRef = storageRef(imgDB, `posts/${data.slug}`);
  await uploadBytes(imageRef, image!);

  const imageURL = await getDownloadURL(imageRef);

  const postRef = doc(db, `posts/${data.slug}`);

  await setDoc(postRef, {
    ...data,
    id: data?.slug,
    Timestamp: Timestamp.now(),
    postImageUrl: imageURL,
  });
};

export const updatePost = async (
  data: Record<string, string>,
  image?: File // Made optional since it's not strictly necessary for the operation
) => {
  if (!data?.title) {
    throw new Error("Post Name is required");
  }
  if (!data?.slug) {
    throw new Error("Post Slug is required");
  }

  let imageURL = data?.postImageUrl;

  if (image) {
    try {
      const imageRef = storageRef(imgDB, `posts/${data.slug}`);
      await uploadBytes(imageRef, image);
      imageURL = await getDownloadURL(imageRef); // Renamed variable to avoid shadowing
    } catch (error) {
      console.error("Failed to upload image:", error);
      // Handle error appropriately, possibly rethrow or return early
    }
  }

  const postRef = doc(db, `posts/${data.id}`);

  await updateDoc(postRef, {
    ...data,
    Timestamp: Timestamp.now(), // Assuming Timestamp is imported correctly
    postImageUrl: imageURL,
  });
};

export const deletePost = async (id: string) => {
  if (!id) {
    throw new Error("Post ID is required");
  }
  const postRef = doc(db, `posts/${id}`);
  await deleteDoc(postRef);
};
