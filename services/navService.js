import { db } from "./firebaseConfig";
import { collection, addDoc, query, onSnapshot, updateDoc, doc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Create a new nav in Firestore
 * @param {Object} navData - Data for the nav
 * @param {string} navData.title - The title of the nav
 * @param {string} navData.url - URL for the nav
 */

const navCollection = collection(db, "navCards");
const storage = getStorage();

export const createNavCard = async (navData) => {
  try {
    const docRef = await addDoc(navCollection, navData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding NavCard: ", error);
  }
};

export const getNavCard = (callback) => {
  const q = query(navCollection);
  return onSnapshot(q, (snapshot) => {
    const nav = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(nav);
  });
};

export const uploadAndGetUrl = async (file) => {
  const storageRef = ref(storage, `card-images/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const updateNavCard = async (id, updatedData) => {
  try {
    const navRef = doc(db, "navCards", id);
    await updateDoc(navRef, updatedData, );
    console.log("NavCard updated:", id, {timestamp: serverTimestamp()});
  } catch (error) {
    console.error("Error updating NavCard data: ", error);
  }
};

export const deleteNavCard = async (id) => {
  try {
    const navRef = doc(db, "nav", id);
    await deleteDoc(navRef);
    console.log("NavCard deleted:", id);
  } catch (error) {
    console.error("Error deleting NavCard data: ", error);
  }
};