import { db } from "./firebaseConfig";
import { collection, addDoc, query, onSnapshot, updateDoc, doc, serverTimestamp, deleteDoc } from "firebase/firestore";

/**
 * Create a new drawer in Firestore
 * @param {Object} drawerData - Data for the drawer
 * @param {string} drawerData.title - The title of the drawer
 * @param {string} drawerData.url - URL for the drawer
 */

const drawerCollection = collection(db, "drawer");

export const createDrawer = async (drawerData) => {
  try {
    const docRef = await addDoc(drawerCollection, drawerData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding drawer: ", error);
  }
};

export const getDrawer = (callback) => {
  const q = query(drawerCollection);
  return onSnapshot(q, (snapshot) => {
    const drawer = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(drawer);
  });
};

export const updateDrawer = async (id, updatedData) => {
  try {
    const drawerRef = doc(db, "drawer", id);
    await updateDoc(drawerRef, updatedData, );
    console.log("drawer updated:", id, {timestamp: serverTimestamp()});
  } catch (error) {
    console.error("Error updating drawer data: ", error);
  }
};

export const deleteDrawer = async (id) => {
  try {
    const drawerRef = doc(db, "drawer", id);
    await deleteDoc(drawerRef);
    console.log("drawer deleted:", id);
  } catch (error) {
    console.error("Error deleting drawer data: ", error);
  }
};