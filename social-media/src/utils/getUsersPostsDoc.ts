import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, orderBy, query } from 'firebase/firestore';

export const getUsersPostsDoc = () => {
  //   return query(
  //     collection(getFirestore(), "posts", getAuth().currentUser?.uid as string),
  //     orderBy("creation", "asc")
  //   );
  return collection(getFirestore(), "posts");
};
