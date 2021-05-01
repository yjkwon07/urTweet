export type ISignupRes = 'ok';

export interface IMyUser extends IUser {
  Followers: { id: IUser['id'] }[];
  Followings: { id: IUser['id'] }[];
  Posts: number[];
}

export interface IUser {
  createdAt?: number;
  email?: string;
  id: number;
  nickname: string;
  updatedAt?: number;
}
