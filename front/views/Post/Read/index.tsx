import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import AppLayout from '@layouts/App';
import usePost from '@modules/post/hooks/usePost';
import { GET_POST_URL } from '@utils/urls';

const Read = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: postData } = usePost({ isInitFetch: false, postId: Number(id) });

  if (!postData) return null;
  return (
    <AppLayout>
      <Head>
        <title>{postData.User.nickname}님의 글 | urtweet</title>
        <meta name="description" content={postData.content} />
        <meta property="og:title" content={`${postData.User.nickname}님의 게시글`} />
        <meta property="og:description" content={postData.content} />
        <meta property="og:image" content={postData.Images[0] ? postData.Images[0].src : '/favicon.ico'} />
        <meta property="og:url" content={GET_POST_URL(id as string)} />
      </Head>
      <PostCard data={postData} />
    </AppLayout>
  );
};

export default Read;
