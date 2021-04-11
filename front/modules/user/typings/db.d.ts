export type ISignup = 'ok';

export interface IMyUser extends IUser {
  Followers: IUser[];
  Followings: IUser[];
  Posts: IPost[];
}

export interface IUser {
  createdAt: Date;
  email: string;
  id: number;
  nickname: string;
  updatedAt: Date;
}

export interface IPost {
  id: number;
}
