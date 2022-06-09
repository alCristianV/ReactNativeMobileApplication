import { Post } from './Post';

export type FeedPost = {
  post: Post;
  userInfo: UserInfo;
  followedUserId: string;
};

export type UserInfo = {
  name: string;
};
