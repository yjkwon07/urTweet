import { useMemo } from 'react';

import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import BaseLayout from '@layouts/BaseLayout';
import { useReadPost } from '@modules/post';

import { StyledViewWrapper } from './styles';
import { PostReadPageFilter } from './utils';

const PostReadView = () => {
  const router = useRouter();
  const postReadPageFilter = useMemo(() => new PostReadPageFilter(router.query), [router.query]);
  const { data: postData } = useReadPost({ postId: postReadPageFilter.param.id });

  return (
    <BaseLayout>
      <StyledViewWrapper>{postData && <PostCard data={postData} initCommentListOpen />}</StyledViewWrapper>
    </BaseLayout>
  );
};

export default PostReadView;
