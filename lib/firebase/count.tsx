'use client';
import { collection, getCountFromServer } from "firebase/firestore";
import useSWR from "swr";
import { db } from "../firebase";

const fetcher = (path: string) =>
  getCountFromServer(collection(db, path)).then((value) => value.data().count);

export default function useCollectionCount({ path }: { path: string }) {
  const { data, error, isLoading } = useSWR(path, fetcher);
  return { data, error, isLoading };
}
