export interface IUser extends IUserInfo {
  Followers: number; // 개수
  Followings: number;
  Posts: number;
}

export interface IMyUser extends IUserInfo {
  Followers: { id: number }[]; // PostId
  Followings: { id: number }[];
  Posts: { id: number }[];
}

export interface IUserInfo {
  createdAt: number;
  email: string;
  id: number;
  nickname: string;
  updatedAt: number;
}
