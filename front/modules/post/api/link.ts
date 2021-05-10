import { IListReadHashtagPostURL, IListReadPostURL, IListReadUserPostURL, IPostURL } from '../@types/query';

/**
 * * post 게시글 정보 조회 GET
 */
export function GET_READ_POST_API(url: IPostURL) {
  return `/post/${url.postId}`;
}

/**
 * * post 게시글 리스트 정보 조회 GET
 */
export function GET_LIST_READ_POST_API(url: IListReadPostURL) {
  return `/posts?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}

/**
 * * 해쉬태그로 게시글 검색 GET
 */
export function GET_LIST_READ_HASHTAG_POST_API(url: IListReadHashtagPostURL) {
  return `/hashtag/${encodeURIComponent(url.hashtag)}?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}

/**
 * * post 유저 게시글 리스트 정보 조회 GET
 */
export function GET_LIST_READ_USER_POST_API(url: IListReadUserPostURL) {
  return `/user/${url.userId}/posts?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}

/**
 * * 해당 게시글 리트윗 POST
 */
export function GET_CREATE_POST_RETWEET_API(url: IPostURL) {
  return `/post/${url.postId}/retweet`;
}

/**
 * * 게시글 등록 POST
 */
export function GET_CREATE_POST_API() {
  return `/post`;
}

/**
 * * 게시글 수정 PATCH
 */
export function GET_MODIFY_POST_API(url: IPostURL) {
  return `/post/${url.postId}`;
}

/**
 * * 게시글 삭제 DELETE
 */
export function GET_REMOVE_POST_API(url: IPostURL) {
  return `/post/${url.postId}`;
}

/**
 * * 해당 게시글 좋아요 PATCH
 */
export function GET_MODIFY_LIKE_POST_API(url: IPostURL) {
  return `/post/${url.postId}/like`;
}

/**
 * * 해당 게시글 좋아요 취소 DELETE
 */
export function GET_REMOVE_LIKE_POST_API(url: IPostURL) {
  return `/post/${url.postId}/like`;
}

/**
 * * 해당 게시글 댓글 등록 POST
 */
export function GET_CREATE_COMMENT_API(url: IPostURL) {
  return `/post/${url.postId}/comment`;
}

/**
 * * 해당 게시글 이미지 업로드 POST
 */
export function GET_UPLOAD_POST_IMAGES_API() {
  return `/post/images`;
}
