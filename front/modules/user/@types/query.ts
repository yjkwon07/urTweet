// - URL
export interface IUserURL {
  userId: number;
}

export interface IListReadFollowURL {
  pageSize?: number;
}

export interface IListReadFollowingURL {
  pageSize?: number;
}

// -- BODY
export interface ILoginBodyQuery {
  email: string;
  password: string;
}

export interface ISignupBodyQuery {
  email: string;
  nickname: string;
  password: string;
}

export interface IModifyNickNameBodyQuery {
  nickname: string;
}

// -- Res
export type ISignupRes = 'ok';

export interface IModifyNickNameRes {
  nickname: string;
}

export interface IFollowRes {
  UserId: number;
}

export interface IUnFollowRes {
  UserId: number;
}

export interface IRemoveFollowerMeRes {
  UserId: number;
}
