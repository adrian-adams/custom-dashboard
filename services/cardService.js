import { db } from "./firebaseConfig";
import { collection, addDoc, query, onSnapshot, updateDoc, doc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Create a new card in Firestore
 * @param {Object} cardData - Data for the card
 * @param {string} cardData.title - The title of the card
 * @param {string} cardData.imageUrl - Image URL for the card
 * @param {Array<string>} cardData.tags - Tags for the card
 * @param {string} cardData.url - URL for the card
 */

const cardsCollection = collection(db, "cards");
const storage = getStorage();

export const createCard = async (cardData) => {
  try {
    const docRef = await addDoc(cardsCollection, cardData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding card: ", error);
  }
};

export const getCard = (callback) => {
  const q = query(cardsCollection);
  return onSnapshot(q, (snapshot) => {
    const cards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(cards);
  });
};

export const uploadAndGetUrl = async (file) => {
  const storageRef = ref(storage, `card-images/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const updateCard = async (id, updatedData) => {
  try {
    const cardRef = doc(db, "cards", id);
    await updateDoc(cardRef, updatedData, );
    console.log("Card updated:", id, {timestamp: serverTimestamp()});
  } catch (error) {
    console.error("Error updating card data: ", error);
  }
};

export const deleteCard = async (id) => {
  try {
    const cardRef = doc(db, "cards", id);
    await deleteDoc(cardRef);
    console.log("Card deleted:", id);
  } catch (error) {
    console.error("Error deleting card data: ", error);
  }
};