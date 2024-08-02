//Create new Author

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

export const createNewAuthor = async (
  data: Record<string, string>,
  image: File
) => {
  if (!data?.name) {
    throw new Error("Author Name is required");
  }
  if (!data?.email) {
    throw new Error("Author email is required");
  }
  if (!image) {
    throw new Error("Author Image is required");
  }

  const imageRef = storageRef(imgDB, `authors/${data.email}`);
  await uploadBytes(imageRef, image!);

  const imageURL = await getDownloadURL(imageRef);

  const AuthorRef = doc(db, `authors/${data.email}`);

  await setDoc(AuthorRef, {
    ...data,
    id: data?.email,
    Timestamp: Timestamp.now(),
    authorPhotoURL: imageURL,
  });
};

export const updateAuthor = async (
  data: Record<string, string>,
  image?: File // Made optional since it's not strictly necessary for the operation
) => {
  if (!data?.name) {
    throw new Error("Author Name is required");
  }
  if (!data?.email) {
    throw new Error("Author email is required");
  }

  let imageURL = data?.authorPhotoURL;

  if (image) {
    try {
      const imageRef = storageRef(imgDB, `authors/${data.email}`);
      await uploadBytes(imageRef, image);
      imageURL = await getDownloadURL(imageRef); // Renamed variable to avoid shadowing
    } catch (error) {
      console.error("Failed to upload image:", error);
      // Handle error appropriately, possibly rethrow or return early
    }
  }

  const AuthorRef = doc(db, `authors/${data.id}`);

  await updateDoc(AuthorRef, {
    ...data,
    Timestamp: Timestamp.now(), // Assuming Timestamp is imported correctly
    authorPhotoURL: imageURL,
  });
};

export const deleteAuthor = async (id: string) => {
  if (!id) {
    throw new Error("Author ID is required");
  }
  const AuthorRef = doc(db, `authors/${id}`);
  await deleteDoc(AuthorRef);
};
