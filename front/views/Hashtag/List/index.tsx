import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import PostCard from '@components/PostCard';
import AppLayout from '@layouts/App';
import { listReadHashTagPost } from '@modules/post';
import useInfiniteListHashtagPost from '@modules/post/hooks/useInfiniteListHashtagPost';
import { DEAFULT_PAGE_SIZE } from '@modules/post/utils/constants';
import { GET_HASHTAG_URL } from '@utils/urls';

const List = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const [pageSize] = useState(DEAFULT_PAGE_SIZE);
  const { data: postListData, status, hasMoreRead } = useInfiniteListHashtagPost({
    isInitFetch: false,
    hashtag: tag as string,
    pageSize,
  });

  useEffect(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMoreRead) {
            const lastId = postListData[postListData.length - 1].id || 0;
            dispatch(listReadHashTagPost.requset({ hashtag: tag as string, lastId, pageSize }));
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, dispatch, pageSize, tag]);

  return (
    <AppLayout>
      <Head>
        <title>{tag} 글 | urTweet</title>
        <meta name="description" content={`${tag} 게시글`} />
        <meta property="og:title" content={`${tag} 게시글`} />
        <meta property="og:description" content={`${tag} 게시글`} />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content={GET_HASHTAG_URL(tag as string)} />
      </Head>
      {postListData.map((post) => (
        <PostCard key={post.id} data={post} />
      ))}
    </AppLayout>
  );
};

export default List;
