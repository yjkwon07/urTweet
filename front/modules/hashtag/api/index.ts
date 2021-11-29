import { axios } from '@modules/client';

import { Hashtag } from '../@types';

/**
 * * 해쉬태그 리스트 정보 조회 GET
 * * url: /hashtags?keyword=:keyword
 * * body: empty
 * * res: ListReadHashtagRes
 */
export type ListReadHashtagUrlQuery = {
  keyword: string;
};
export interface ListReadHashtagResData extends ListReadCommonRes {
  list: Hashtag[];
}
export interface ListReadHashtagRes extends CommonRes {
  resData: ListReadHashtagResData;
}
export function GET_LIST_READ_HASHTAG_API_KEY() {
  return `/hashtags`;
}
export function GET_LIST_READ_HASHTAG_API(url: ListReadHashtagUrlQuery) {
  return `${GET_LIST_READ_HASHTAG_API_KEY()}?keyword=${url.keyword}`;
}
export const requestListReadHashtag = (url: ListReadHashtagUrlQuery) => {
  return axios.get<ListReadHashtagRes>(GET_LIST_READ_HASHTAG_API(url));
};
