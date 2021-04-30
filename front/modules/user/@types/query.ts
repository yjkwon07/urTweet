// - URL
export interface IUserURL {
  userId: string;
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
