import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

export const getUsersDoc = () => {
  return doc(getFirestore(), "users", getAuth().currentUser?.uid as string);
};
