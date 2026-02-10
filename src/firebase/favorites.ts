import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

export const addFavorite = async (
  userId: string,
  psychologistId: string
) => {
  return addDoc(collection(db, "favorites"), {
    userId,
    psychologistId,
    createdAt: Timestamp.now(),
  });
};

export const removeFavorite = async (
  userId: string,
  psychologistId: string
) => {
  const q = query(
    collection(db, "favorites"),
    where("userId", "==", userId),
    where("psychologistId", "==", psychologistId)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => deleteDoc(doc.ref));
};

export const getFavoritePsychologistIds = async (
  userId: string
): Promise<string[]> => {
  const q = query(
    collection(db, "favorites"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => doc.data().psychologistId);
};
