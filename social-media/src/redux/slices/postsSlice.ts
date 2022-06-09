import { getDoc, getDocs } from 'firebase/firestore';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';
import { getUsersDoc } from '../../utils/getUsersDoc';
import { getUsersPostsDoc } from '../../utils/getUsersPostsDoc';
import { RootState } from '../store/store';

// Define a type for the slice state
interface PostsState {
  posts: Post[];
  status: string;
}

// Define the initial state using that type
const initialState: PostsState = {
  posts: [],
  status: "",
};

export const fetchUserPosts = createAsyncThunk(
  "fetchUserPosts",
  async (userId: string) => {
    return await getUserPosts(userId);
  }
);

export const getUserPosts = async (userId: string) => {
  const usersPostsCollectionRef = getUsersPostsDoc(userId);
  const usersPostsDocsSnap = await getDocs(usersPostsCollectionRef);
  const posts: Post[] = [];
  usersPostsDocsSnap.forEach((doc) => {
    posts.push({
      id: doc.id,
      caption: doc.data().caption,
      downloadUrl: doc.data().downloadURL,
      creationSeconds: doc.data().creation.seconds,
    });
  });
  return posts;
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.posts = payload;
        console.log(state.posts);
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
