import { IUserInfo } from '@modules/user/@types/db';

export interface IPost {
  Comments: IComment[];
  Images: IIMage[];
  Likers: ILiker[];
  Retweet: IPost | null;
  RetweetId: number | null;
  User: Pick<IUserInfo, 'id' | 'nickname'>;
  UserId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

export interface ILiker {
  id: number;
}

export interface ILike {
  createdAt: string;
  updatedAt: string;
  PostId: number;
  UserId: number;
}

export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  User: Pick<IUserInfo, 'id' | 'nickname'>;
}

export interface IIMage {
  PostId: number;
  createdAt: string;
  id: number;
  src: string;
  updatedAt: string;
}
