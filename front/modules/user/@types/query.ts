// - URL
export interface IUserURL {
  userId: number;
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
export interface IModifyNickNameRes {
  nickname: string;
}

export interface IFollowRes {
  UserId: number;
}

export interface IUnFollowRes {
  UserId: number;
}
