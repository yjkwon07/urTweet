import { IUser } from '@modules/user/@types/db';

export type IImagePath = string[];

export interface IPost {
  Comments: IComment[];
  Images: string[];
  Likers: ILikers[];
  RetweetId: IPost | null;
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

export interface IRemovePostRes {
  PostId: number;
}
