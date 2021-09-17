import { IUserInfo } from '@modules/user/@types/db';

export type Post = {
  Comments: Comment[];
  Images: IMage[];
  Likers: Liker[];
  Retweet: Post | null;
  RetweetId: number | null;
  User: Pick<IUserInfo, 'id' | 'nickname'>;
  UserId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
};

export type Liker = {
  id: number;
};

export type Like = {
  createdAt: string;
  updatedAt: string;
  PostId: number;
  UserId: number;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  User: Pick<IUserInfo, 'id' | 'nickname'>;
};

export type IMage = {
  PostId: number;
  createdAt: string;
  id: number;
  src: string;
  updatedAt: string;
};