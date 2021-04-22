// - URL
export interface IPostURL {
  postId: string;
}

export interface IListReadPostURL {
  offset?: number;
  pageSize?: number;
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
