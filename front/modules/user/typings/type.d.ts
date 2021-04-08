export interface IModifyNickNameBodyQuery {
  nickname: string;
}

export interface IReadUserURL {
  userId: string;
}

export interface ILoginBodyQuery {
  email: string;
  password: string;
}

export interface ISignupBodyQuery {
  email: string;
  nickname: string;
  password: string;
}
