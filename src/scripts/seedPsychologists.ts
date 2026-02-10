import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import psychologists from "../data/psychologists.json";

export const seedPsychologists = async () => {
  try {
    const collectionRef = collection(db, "psychologists");

    for (const psychologist of psychologists) {
      await addDoc(collectionRef, {
        ...psychologist,
        createdAt: new Date(),
      });
    }

    console.log("✅ Psychologists successfully seeded!");
  } catch (error) {
    console.error("❌ Error seeding psychologists:", error);
  }
};
