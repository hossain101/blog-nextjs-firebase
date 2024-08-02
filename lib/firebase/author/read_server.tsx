import { db } from "@/lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const getAuthor = async (id: string) => {
    return getDoc(doc(db,`authors/${id}`)).then((querySnapshot) => {
      const data = querySnapshot.data();
      return data;
    });
  };
  