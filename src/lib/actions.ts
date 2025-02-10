import { db } from "@/lib/firebase";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { CupydCard } from "@/lib/types";

function generateCardId(length: number = 6): string {
  // Prefix for card identification
  const prefix = "cpd_";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + result;
}

export async function createCupydCard(userId: string): Promise<CupydCard> {
  try {
    const id = generateCardId();

    const newCard: Omit<CupydCard, "id"> = {
      isAccepted: false,
      creatorId: userId, // Store the creator's userId
      isAnswered: true,
      answeredAt: null,
    };

    await setDoc(doc(db, "cards", id), newCard);

    return {
      id,
      ...newCard,
    };
  } catch (error) {
    console.error("Error creating cupyd card:", error);
    throw new Error("Failed to create cupyd card");
  }
}

export async function getCardByCreatorId(
  creatorId: string
): Promise<CupydCard | null> {
  try {
    const cardsRef = collection(db, "cards");
    const q = query(cardsRef, where("creatorId", "==", creatorId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Assuming one user can only have one card, return the first match
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as CupydCard;
  } catch (error) {
    console.error("Error fetching card:", error);
    throw new Error("Failed to fetch card");
  }
}

export async function resetCupydCard(cardId: string): Promise<void> {
  try {
    const cardRef = doc(db, "cards", cardId);
    await setDoc(
      cardRef,
      {
        isAccepted: false,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error resetting cupyd card:", error);
    throw new Error("Failed to reset card");
  }
}

export async function answerCard(
  cardId: string,
  accept: boolean
): Promise<void> {
  try {
    const cardRef = doc(db, "cards", cardId);
    await setDoc(
      cardRef,
      {
        isAccepted: accept,
        isAnswered: true,
        answeredAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error answering cupyd card:", error);
    throw new Error("Failed to answer card");
  }
}

export async function getTotalCards(): Promise<number> {
  try {
    const cardsRef = collection(db, "cards");
    const snapshot = await getDocs(cardsRef);
    return snapshot.size;
  } catch (error) {
    console.error("Error getting total cards:", error);
    throw new Error("Failed to get total cards count");
  }
}
