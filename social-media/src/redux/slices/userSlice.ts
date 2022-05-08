import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoc } from "firebase/firestore";
import { getUsersDoc } from "../../utils/getUsersDoc";

export const getUser = createAsyncThunk("getUser", async () => {
  const usersDocRef = getUsersDoc();
  const usersDocSnap = await getDoc(usersDocRef);

  if (usersDocSnap.exists()) {
    return usersDocSnap.data();
  } else {
    console.log("Does not exist");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, { payload }) => {
      state.status = "loading";
    }),
      builder.addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user = payload as any;
        console.log(state.user);
      });
  },
});

export default userSlice.reducer;
