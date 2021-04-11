import { IPost } from '@modules/post/typings/db';

export type ISignup = 'ok';

export interface IMyUser extends IUser {
  Followers: IUser[];
  Followings: IUser[];
  Posts: IPost['id'][];
}

export interface IUser {
  createdAt: Date;
  email: string;
  id: number;
  nickname: string;
  updatedAt: Date;
}
