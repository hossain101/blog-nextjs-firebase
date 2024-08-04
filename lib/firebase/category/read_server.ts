import { db } from "@/lib/firebase";
import {  doc, getDoc, collection, getDocs } from "firebase/firestore";

export const getCategory = async (id: string) => {
    return getDoc(doc(db,`categories/${id}`)).then((querySnapshot) => {
      const data = querySnapshot.data();
      return data;
    });
  };
  
 
 export const getAllCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const data = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    return data
  }