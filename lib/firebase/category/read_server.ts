import { db } from "@/lib/firebase";
import {  doc, getDoc } from "firebase/firestore";

export const getCategory = async (id: string) => {
    return getDoc(doc(db,`categories/${id}`)).then((querySnapshot) => {
      const data = querySnapshot.data();
      return data;
    });
  };
  