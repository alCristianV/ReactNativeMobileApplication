import { getDoc, getDocs } from 'firebase/firestore';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsersDoc } from '../../utils/getUsersDoc';
import { getUsersPostsDoc } from '../../utils/getUsersPostsDoc';

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const usersDocRef = getUsersDoc();
  const usersDocSnap = await getDoc(usersDocRef);

  if (usersDocSnap.exists()) {
    return usersDocSnap.data();
  } else {
    console.log("Does not exist");
  }
});

export const fetchUserPosts = createAsyncThunk("fetchUserPosts", async () => {
  console.log("fetchUserPosts");
  console.log(getUsersPostsDoc());
  const usersPostsCollectionRef = getUsersPostsDoc();
  console.log("fetchUserPosts2");
  const usersPostsDocsSnap = await getDocs(usersPostsCollectionRef);
  console.log("fetchUserPosts3");
  usersPostsDocsSnap.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    posts: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user = payload as any;
        console.log(state.user);
      }),
      builder.addCase(fetchUserPosts.pending, (state) => {
        console.log("peending");
        //state.status = "loading";
      }),
      builder.addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.posts = payload as any;
        console.log(state.posts);
      });
  },
});

export default userSlice.reducer;
