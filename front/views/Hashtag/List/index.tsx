import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import PostCard from '@components/PostCard';
import { listReadHashTagPost, useInfiniteHashTagPost } from '@modules/post';

const DEAFULT_PAGE_SIZE = 3;

export interface IProps {
  isSSR: boolean;
}

const List = ({ isSSR }: IProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const hashtag = router.query.tag as string;
  const [pageSize] = useState(DEAFULT_PAGE_SIZE);
  const { data: postListData, status, hasMoreRead } = useInfiniteHashTagPost({
    isInitFetch: !isSSR,
    hashtag,
    pageSize,
  });

  useEffect(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMoreRead) {
            const lastId = postListData[postListData.length - 1].id;
            dispatch(listReadHashTagPost.request({ hashtag, lastId, pageSize }));
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, dispatch, pageSize, hashtag]);

  return (
    <>
      {postListData.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </>
  );
};

export default List;
