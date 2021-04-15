// - URL
export interface IPostURL {
  postId: string;
}

export interface IListReadPostURL {
  lastId?: string;
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

export interface IUploadImageBodyQuery {
  files: FormData;
}

export interface ICommentBodyQuery {
  content: string;
}
