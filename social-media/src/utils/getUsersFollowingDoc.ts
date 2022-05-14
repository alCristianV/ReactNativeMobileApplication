import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, orderBy, query } from 'firebase/firestore';

export const getUsersFollowingDoc = (userId: string) => {
  return collection(getFirestore(), "following", userId, "userFollowing");
};
