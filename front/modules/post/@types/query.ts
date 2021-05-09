// - URL
export interface IPostURL {
  postId: number;
}

export interface IListReadPostURL {
  lastId?: number;
  pageSize: number;
}

export interface IListReadUserPostURL {
  userId: number;
  lastId?: number;
  pageSize: number;
}

export interface IListReadHashtagPostURL {
  hashtag: number;
  lastId?: number;
  pageSize: number;
}

// -- BODY
export interface IPostBodyQuery {
  content: string;
  image?: string[] | string;
}

export type IUploadImageBodyQuery = FormData;

export interface ICommentBodyQuery {
  content: string;
  userId: number;
}

// -- Requset
export interface IModifyPostReq {
  url: IPostURL;
  body: IPostBodyQuery;
}

export interface ICreateCommentReq {
  url: IPostURL;
  body: ICommentBodyQuery;
}

// -- response
export type IUploadImagePathRes = string[];

export interface IModifyPostRes {
  PostId: number;
  content: string;
}

export interface IRemovePostRes {
  PostId: number;
}

export interface ILikePostRes {
  PostId: number;
  UserId: number;
}

export interface IUnlikePostRes {
  PostId: number;
  UserId: number;
}
