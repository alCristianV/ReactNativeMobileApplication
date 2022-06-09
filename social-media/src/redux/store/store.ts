import { configureStore } from '@reduxjs/toolkit';

import feedReducer from '../slices/feedSlice';
import postsReducer from '../slices/postsSlice';
import usersReducer from '../slices/usersSlice';

const store = configureStore({
  reducer: { users: usersReducer, posts: postsReducer, feed: feedReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, user: UsersState, feed: FeedState}
export type AppDispatch = typeof store.dispatch;

export default store;
