import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, orderBy, query } from 'firebase/firestore';

export const getUsersPostsDoc = (userId: string) => {
  return query(
    collection(getFirestore(), "posts", userId, "userPosts"),
    orderBy("creation", "asc")
  );
};
