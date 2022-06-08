import { getAuth } from 'firebase/auth';
import { getDoc, getDocs, onSnapshot } from 'firebase/firestore';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsersDoc } from '../../utils/getUsersDoc';
import { getUsersFollowingDoc } from '../../utils/getUsersFollowingDoc';
import { getUsersPostsDoc } from '../../utils/getUsersPostsDoc';

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (userId: string) => {
    return await getUserInfo(userId);
  }
);

const getUserInfo = async (userId: string) => {
  const usersDocRef = getUsersDoc(userId);
  const usersDocSnap = await getDoc(usersDocRef);

  if (usersDocSnap.exists()) {
    return usersDocSnap.data();
  } else {
    console.log("Does not exist");
  }
};

const getUserPosts = async (userId: string) => {
  const usersPostsCollectionRef = getUsersPostsDoc(userId);
  const usersPostsDocsSnap = await getDocs(usersPostsCollectionRef);
  const posts: any = [];
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

export const fetchUserPosts = createAsyncThunk(
  "fetchUserPosts",
  async (userId: string) => {
    return await getUserPosts(userId);
  }
);

export const fetchUserFeedPosts = createAsyncThunk(
  "fetchUserFeedPosts",
  async (userId: string) => {
    const followings = await getUserFollowing(userId);
    const followedUsers = await Promise.all(
      followings.map(async (followingId) => {
        return {
          followedUserId: followingId,
          userInfo: await getUserInfo(followingId),
          posts: await getUserPosts(followingId),
        };
      })
    );

    const followedUsersPosts: any[] = [];
    followedUsers.forEach((followedUser) => {
      followedUser.posts.forEach((post: any) => {
        followedUsersPosts.push({
          post: post,
          userInfo: followedUser.userInfo,
          followedUserId: followedUser.followedUserId,
        });
      });
    });
    console.log(followedUsersPosts);
    return followedUsersPosts.sort((x, y) => {
      return x.post.creation - y.post.creation;
    });
  }
);

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

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    posts: [],
    status: "",
    feedPosts: [],
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
      }),
      builder.addCase(fetchUserFeedPosts.fulfilled, (state, { payload }) => {
        state.feedPosts = payload as any;
        console.log(state.feedPosts);
      });
  },
});

export default userSlice.reducer;
