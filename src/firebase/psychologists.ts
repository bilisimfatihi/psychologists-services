import {
  collection,
  documentId,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./config";
import type { Psychologist, SortOption } from "../types/types";

type GetPsychologistsParams = {
  lastDoc?: DocumentSnapshot | null;
  filter: SortOption;
  pageSize: number;
}

export const getPsychologists = async ({
  lastDoc = null,
  filter,
  pageSize,
}: GetPsychologistsParams) => {
  const constraints: QueryConstraint[] = [];
  const psychologistsRef = collection(db, "psychologists");

  switch (filter) {
    case "A to Z":
      constraints.push(orderBy("name", "asc"));
      break;

    case "Z to A":
      constraints.push(orderBy("name", "desc"));
      break;

    case "Price: Low to High":
      constraints.push(orderBy("price_per_hour", "asc"));
      break;

    case "Price: High to Low":
      constraints.push(orderBy("price_per_hour", "desc"));
      break;

    case "Popular":
      constraints.push(orderBy("rating", "desc"));
      break;

    case "Not popular":
      constraints.push(orderBy("rating", "asc"));
      break;

    case "Less than 100$":
      constraints.push(where("price_per_hour", "<", 100));
      constraints.push(orderBy("price_per_hour", "asc"));
      break;

    case "Greater than 100$":
      constraints.push(where("price_per_hour", ">", 100));
      constraints.push(orderBy("price_per_hour", "asc"));
      break;

    case "Show all":
    default:
      constraints.push(orderBy("name", "asc"));
      break;
  }

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  constraints.push(limit(pageSize));

  const q = query(psychologistsRef, ...constraints);
  const snapshot = await getDocs(q);

  const psychologists = snapshot.docs.map((doc) => ({
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

  return {
    psychologists,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
    hasMore: snapshot.docs.length === pageSize,
  };
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

