import React from 'react';

import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import usePost from '@modules/post/hooks/usePost';

export interface IProps {
  isSSR: boolean;
}

const Read = ({ isSSR }: IProps) => {
  const router = useRouter();
  const postId = Number(router.query.id as string);
  const { data: postData } = usePost({ isInitFetch: !isSSR, postId });

  if (!postData) return null;
  return <PostCard data={postData} />;
};

export default Read;
