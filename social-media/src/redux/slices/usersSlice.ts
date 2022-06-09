import { getDoc } from 'firebase/firestore';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserInfo } from '../../types/User';
import { getUsersDoc } from '../../utils/getUsersDoc';
import { RootState } from '../store/store';

// Define a type for the slice state
interface UsersState {
  user: UserInfo | undefined;
  status: string;
}

// Define the initial state using that type
const initialState: UsersState = {
  user: undefined,
  status: "",
};

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (userId: string) => {
    return await getUserInfo(userId);
  }
);

export const getUserInfo = async (userId: string) => {
  const usersDocRef = getUsersDoc(userId);
  const usersDocSnap = await getDoc(usersDocRef);

  if (usersDocSnap.exists()) {
    return usersDocSnap.data();
  } else {
    console.log("Does not exist");
  }
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        console.log(payload);
        state.user = payload as UserInfo;
        console.log(state.user);
      });
  },
});

export const selectUser = (state: RootState) => state.users.user;

export default userSlice.reducer;
