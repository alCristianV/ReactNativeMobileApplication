import { getUsersDoc } from "../../utils/getUsersDoc";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { USER_STATE_CHANGE } from "../constants";

export const fetchUser = () => {
  return async (
    dispatch: (arg0: { type: string; currentUser: DocumentData }) => void
  ) => {
    const usersDocRef = getUsersDoc();
    const usersDocSnap = await getDoc(usersDocRef);

    if (usersDocSnap.exists()) {
      dispatch({ type: USER_STATE_CHANGE, currentUser: usersDocSnap.data() });
    } else {
      console.log("Does not exist");
    }
  };
};
