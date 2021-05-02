// - URL
export interface IPostURL {
  postId: number;
}

export interface IListReadPostURL {
  lastId?: number;
  pageSize: number;
}

export interface IListReadUserPostURL {
  userId: string;
  lastId?: string;
}

export interface IListReadHashtagPostURL {
  hashtag: string;
  lastId?: string;
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

// -- response
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

export type IImagePath = string[];
