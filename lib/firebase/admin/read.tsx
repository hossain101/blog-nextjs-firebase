import { db } from "@/lib/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useAdmin({ uid }: { uid: string }) {
  const { data, error } = useSWRSubscription(
    [`admins/${uid}`],
    ([path], { next }) => {
      const ref = doc(db, path);

      const unSub = onSnapshot(
        ref,
        (snaps) => {
          next(null, snaps.exists() ? snaps.data() : null);
        },
        (error) => {
          next(error.message);
        }
      );

      return () => unSub();
    }
  );

  return {
    data,
    error,
    isLoading: data === undefined && error === undefined,
  };
}
