import { getAuth } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';

export const getUsersDoc = (userId: string) => {
  return doc(getFirestore(), "users", userId);
};
