import { useCallback } from 'react';

import cloneDeep from 'lodash/cloneDeep';

import useMatchMutate from '@hooks/useMatchMutate';
import { getInfiniteRegExpKey } from '@utils/swrHelper';

import { Comment, Post } from '../@types';
import { GET_LIST_READ_POST_API_KEY, GET_READ_POST_API, ListReadPostResData } from '../api';

export function useFetchRemovePostMutate() {
  const mutate = useMatchMutate();
  const successMutate = useCallback(
    async (postId: number) => {
      const postResListData = (postResListData: ListReadPostResData) => {
        const clonePostResListData = cloneDeep(postResListData);
        clonePostResListData.list = clonePostResListData.list?.filter((_) => _.id !== postId);
        return clonePostResListData;
      };

      const postData = () => {
        return null;
      };

      await Promise.all([
        mutate(new RegExp(`^${GET_LIST_READ_POST_API_KEY()}`), postResListData, false),
        mutate(
          new RegExp(`^${getInfiniteRegExpKey()}${GET_LIST_READ_POST_API_KEY()}`),
          (_: ListReadPostResData[]) => _.map(postResListData),
          false,
        ),
        mutate(new RegExp(`^${GET_READ_POST_API({ postId })}`), postData, false),
      ]);
    },
    [mutate],
  );

  return { successMutate };
}

export function useFetchLikePostMutate() {
  const mutate = useMatchMutate();
  const successMutate = useCallback(
    async (postId: number, userId: number) => {
      const postResListData = (postResListData: ListReadPostResData) => {
        const clonePostResListData = cloneDeep(postResListData);
        const post = clonePostResListData.list?.find((_) => _.id === postId);
        if (post) post.Likers.push({ id: userId });
        return clonePostResListData;
      };

      const postData = (post: Post) => {
        const clonePost = cloneDeep(post);
        if (clonePost) {
          clonePost.Likers.push({ id: userId });
        }
        return clonePost;
      };

      await Promise.all([
        mutate(new RegExp(`^${GET_LIST_READ_POST_API_KEY()}`), postResListData, false),
        mutate(
          new RegExp(`^${getInfiniteRegExpKey()}${GET_LIST_READ_POST_API_KEY()}`),
          (_: ListReadPostResData[]) => _.map(postResListData),
          false,
        ),
        mutate(new RegExp(`^${GET_READ_POST_API({ postId })}`), postData, false),
      ]);
    },
    [mutate],
  );

  return { successMutate };
}

export function useFetchUnLikePostMutate() {
  const mutate = useMatchMutate();
  const successMutate = useCallback(
    async (postId: number, userId: number) => {
      const postResListData = (postResListData: ListReadPostResData) => {
        const clonePostResListData = cloneDeep(postResListData);
        const post = clonePostResListData.list?.find((_) => _.id === postId);
        if (post) post.Likers = post.Likers.filter((Liker) => Liker.id !== userId);
        return clonePostResListData;
      };

      const postData = (post: Post) => {
        const clonePost = cloneDeep(post);
        if (clonePost) {
          clonePost.Likers = clonePost.Likers.filter((Liker) => Liker.id !== userId);
        }
        return clonePost;
      };

      await Promise.all([
        mutate(new RegExp(`^${GET_LIST_READ_POST_API_KEY()}`), postResListData, false),
        mutate(
          new RegExp(`^${getInfiniteRegExpKey()}${GET_LIST_READ_POST_API_KEY()}`),
          (_: ListReadPostResData[]) => _.map(postResListData),
          false,
        ),
        mutate(new RegExp(`^${GET_READ_POST_API({ postId })}`), postData, false),
      ]);
    },
    [mutate],
  );

  return { successMutate };
}

export function useFetchCreatePostMutate() {
  const mutate = useMatchMutate();

  const successMutate = useCallback(
    async (post: Post) => {
      const postResListData = (postResListData: ListReadPostResData) => {
        const clonePostResListData = cloneDeep(postResListData);
        if (clonePostResListData.curPage === 1) {
          clonePostResListData.list.unshift(post);
        }
        return clonePostResListData;
      };

      await Promise.all([
        mutate(new RegExp(`^${GET_LIST_READ_POST_API_KEY()}`), postResListData, false),
        mutate(
          new RegExp(`^${getInfiniteRegExpKey()}${GET_LIST_READ_POST_API_KEY()}`),
          (_: ListReadPostResData[]) => _.map(postResListData),
          false,
        ),
      ]);
    },
    [mutate],
  );

  return { successMutate };
}

export function useFetchUpdatePostMutate() {
  const mutate = useMatchMutate();

  const successMutate = useCallback(
    async (replacePost: Post, postId: number) => {
      const postResListData = (postResListData: ListReadPostResData) => {
        const clonePostResListData = cloneDeep(postResListData);
        clonePostResListData.list = clonePostResListData.list?.map((_) => {
          if (_.id === postId) return cloneDeep(replacePost);
          return _;
        });
        return clonePostResListData;
      };

      const postData = () => {
        return cloneDeep(replacePost);
      };

      await Promise.all([
        mutate(new RegExp(`^${GET_LIST_READ_POST_API_KEY()}`), postResListData, false),
        mutate(
          new RegExp(`^${getInfiniteRegExpKey()}${GET_LIST_READ_POST_API_KEY()}`),
          (_: ListReadPostResData[]) => _.map(postResListData),
          false,
        ),
        mutate(new RegExp(`^${GET_READ_POST_API({ postId })}`), postData, false),
      ]);
    },
    [mutate],
  );

  return { successMutate };
}

export const useFetchCreateCommentMutate = () => {
  const mutate = useMatchMutate();

  const successMutate = useCallback(
    async (comment: Comment, postId: number) => {
      const postResListData = (postResListData: ListReadPostResData) => {
        const clonePostResListData = cloneDeep(postResListData);
        const post = clonePostResListData.list?.find((_) => _.id === postId);
        if (post) post.Comments.push(comment);
        return clonePostResListData;
      };

      const postData = (post: Post) => {
        const clonePost = cloneDeep(post);
        clonePost.Comments.push(comment);
        return clonePost;
      };

      await Promise.all([
        mutate(new RegExp(`^${GET_LIST_READ_POST_API_KEY()}`), postResListData, false),
        mutate(
          new RegExp(`^${getInfiniteRegExpKey()}${GET_LIST_READ_POST_API_KEY()}`),
          (_: ListReadPostResData[]) => _.map(postResListData),
          false,
        ),
        mutate(new RegExp(`^${GET_READ_POST_API({ postId })}`), postData, false),
      ]);
    },
    [mutate],
  );

  return { successMutate };
};
