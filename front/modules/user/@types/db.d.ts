export interface User extends UserInfo {
  Followers: number;
  Followings: number;
  Posts: number;
}

export interface MyUser extends UserInfo {
  Followers: { id: number }[];
  Followings: { id: number }[];
  Posts: { id: number }[];
}

export interface UserInfo {
  createdAt: number;
  email: string;
  id: number;
  nickname: string;
  updatedAt: number;
}
