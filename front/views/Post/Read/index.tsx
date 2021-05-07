import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import AppLayout from '@layouts/App';
import { postSelector } from '@modules/post';
import { useAppSelector } from '@modules/store/slices';

const Read = () => {
  const postData = useAppSelector(postSelector.data);
  const router = useRouter();
  const { id } = router.query;

  if (!postData) return null;
  return (
    <AppLayout>
      <Head>
        <title>{postData.User.nickname}님의 글</title>
        <meta name="description" content={postData.content} />
        <meta property="og:title" content={`${postData.User.nickname}님의 게시글`} />
        <meta property="og:description" content={postData.content} />
        <meta property="og:image" content={postData.Images[0] ? postData.Images[0].src : '/favicon.ico'} />
        <meta property="og:url" content={`/post/${id}`} />
      </Head>
      <PostCard data={postData} />
    </AppLayout>
  );
};

export default Read;
