import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '@layouts/App';
import { postSelector } from '@modules/post';
import { useAppSelector } from '@modules/store/slices';
import PostCard from '@views/Home/PostCard';

const Read = () => {
  const singlePost = useAppSelector(postSelector.data);
  const router = useRouter();
  const { id } = router.query;

  if (!singlePost) return null;
  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : '/favicon.ico'} />
        <meta property="og:url" content={`/post/${id}`} />
      </Head>
      <PostCard data={singlePost} />
    </AppLayout>
  );
};

export default Read;
