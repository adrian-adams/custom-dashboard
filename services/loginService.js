import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

/**
 * Fetch a specific user from Firestore by username
 * @param {string} userName - The username (e.g. "Admin" or "Guest")
 * @returns {Promise<Object>} The user data object
 */

export const getUser = async (userName) => {
  try {
    const userRef = doc(db, "users", userName.toLowerCase());
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

