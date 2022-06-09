import { getDoc, getDocs } from 'firebase/firestore';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { FeedPost, UserInfo } from '../../types/FeedPost';
import { Post } from '../../types/Post';
import { getUsersDoc } from '../../utils/getUsersDoc';
import { getUsersFollowingDoc } from '../../utils/getUsersFollowingDoc';
import { getUsersPostsDoc } from '../../utils/getUsersPostsDoc';
import { RootState } from '../store/store';
import { getUserPosts } from './postsSlice';
import { getUserInfo } from './usersSlice';

// Define a type for the slice state
interface FeedState {
  feedPosts: FeedPost[];
  status: string;
}

// Define the initial state using that type
const initialState: FeedState = {
  feedPosts: [],
  status: "",
};

const getUserFollowing = async (userId: string) => {
  const usersFollowingCollectionRef = getUsersFollowingDoc(userId);

  const usersFollowingDocsSnap = await getDocs(usersFollowingCollectionRef);
  const followings: string[] = [];
  usersFollowingDocsSnap.forEach(async (userDoc) => {
    const followedUserId = userDoc.data().userId;
    followings.push(followedUserId);
  });

  return followings;
};

export const fetchUserFeedPosts = createAsyncThunk(
  "fetchUserFeedPosts",
  async (userId: string) => {
    const followings = await getUserFollowing(userId);
    const followedUsers = await Promise.all(
      followings.map(async (followingId) => {
        return {
          followedUserId: followingId,
          userInfo: (await getUserInfo(followingId)) as UserInfo,
          posts: await getUserPosts(followingId),
        };
      })
    );

    const followedUsersPosts: FeedPost[] = [];
    followedUsers.forEach((followedUser) => {
      followedUser.posts.forEach((post: Post) => {
        followedUsersPosts.push({
          post: post,
          userInfo: followedUser.userInfo,
          followedUserId: followedUser.followedUserId,
        });
      });
    });
    console.log(followedUsersPosts);
    return followedUsersPosts.sort((x, y) => {
      return x.post.creationSeconds - y.post.creationSeconds;
    });
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserFeedPosts.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchUserFeedPosts.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.feedPosts = payload;
        console.log(state.feedPosts);
      });
  },
});

export const selectFeedPosts = (state: RootState) => state.feed.feedPosts;

export default feedSlice.reducer;
