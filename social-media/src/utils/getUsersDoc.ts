import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

export const getUsersDoc = () => {
  console.log(getAuth().currentUser?.uid);
  return doc(getFirestore(), "users", getAuth().currentUser?.uid as string);
};
