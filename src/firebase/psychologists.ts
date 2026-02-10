import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "./config";
import type { Psychologist } from "../types/types";

export const getPsychologists = async (): Promise<Psychologist[]> => {
  const querySnapshot = await getDocs(collection(db, "psychologists"));

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    avatarUrl: doc.data().avatar_url,
    specialization: doc.data().specialization,
    experience: parseInt(doc.data().experience),
    license: doc.data().license,
    rating: doc.data().rating,
    pricePerHour: doc.data().price_per_hour,
    initialConsultation: doc.data().initial_consultation,
    about: doc.data().about,
    reviews: doc.data().reviews ?? [],
  })) as Psychologist[];
};

export const getPsychologistsByIds = async (
  ids: string[]
): Promise<Psychologist[]> => {
  if (ids.length === 0) return [];

  const q = query(
    collection(db, "psychologists"),
    where(documentId(), "in", ids)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    avatarUrl: doc.data().avatar_url,
    specialization: doc.data().specialization,
    experience: parseInt(doc.data().experience),
    license: doc.data().license,
    rating: doc.data().rating,
    pricePerHour: doc.data().price_per_hour,
    initialConsultation: doc.data().initial_consultation,
    about: doc.data().about,
    reviews: doc.data().reviews ?? [],
  }));
};

