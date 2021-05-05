export interface IMyUser extends IUser {
  Followers: IUser[];
  Followings: IUser[];
  Posts: number[];
}

export interface IUser {
  createdAt?: number;
  email?: string;
  id: number;
  nickname: string;
  updatedAt?: number;
}
