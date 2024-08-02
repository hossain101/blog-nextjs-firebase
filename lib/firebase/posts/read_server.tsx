import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getAllPosts = async () => {
  return getDocs(collection(db, "posts")).then((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return data;
  });
};

export const getPost = async (id: string) => {
  return await getDoc(doc(db, `posts/${id}`)).then((snapshot) =>
    snapshot.data()
  );
};
