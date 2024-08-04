import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getAllPosts = async () => {
  return getDocs(collection(db, "posts")).then((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return data;
  });
};
export const getAllPostsWithCategory = async (
  categoryId: string
): Promise<any[]> => {
  try {
    const categoryQuery = query(
      collection(db, "posts"),
      where("category", "==", categoryId)
    );

    const querySnapshot = await getDocs(categoryQuery);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow or handle as per your application's error handling strategy
  }
};

export const getPost = async (id: string) => {
  return await getDoc(doc(db, `posts/${id}`)).then((snapshot) =>
    snapshot.data()
  );
};
