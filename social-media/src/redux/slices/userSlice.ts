import { getDoc, getDocs, onSnapshot } from 'firebase/firestore';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsersDoc } from '../../utils/getUsersDoc';
import { getUsersPostsDoc } from '../../utils/getUsersPostsDoc';

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (userId: string) => {
    const usersDocRef = getUsersDoc(userId);
    const usersDocSnap = await getDoc(usersDocRef);

    if (usersDocSnap.exists()) {
      return usersDocSnap.data();
    } else {
      console.log("Does not exist");
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "fetchUserPosts",
  async (userId: string) => {
    const usersPostsCollectionRef = getUsersPostsDoc(userId);
    const usersPostsDocsSnap = await getDocs(usersPostsCollectionRef);
    const docs: any = [];
    console.log(usersPostsDocsSnap);
    usersPostsDocsSnap.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      docs.push({
        id: doc.id,
        caption: doc.data().caption,
        downloadUrl: doc.data().downloadURL,
        creationSeconds: doc.data().creation.seconds,
      });
    });
    return docs;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    posts: [],
    status: "",
    following: [],
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
        state.status = "loading";
      }),
      builder.addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.posts = payload as any;
        console.log(state.posts);
      });
  },
});

export default userSlice.reducer;
