import { IUser } from '@modules/user/@types/db';

export interface IPost {
  Comments: IComment[];
  Images: IIMage[];
  Likers: ILikers[];
  Retweet: IPost | null;
  RetweetId: number | null;
  User: IUser;
  UserId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

export interface ILikers {
  id: number;
  Like: ILike;
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
  User: IUser;
}

export interface IIMage {
  PostId: number;
  createdAt: string;
  id: number;
  src: string;
  updatedAt: string;
}
