import { useEffect } from 'react';

import { Empty } from 'antd';

import PostCard from '@components/PostCard';
import BaseLayout from '@layouts/BaseLayout';
import { useReadPost } from '@modules/post';

import { StyledViewWrapper } from './styles';

const PostReadView = () => {
  const { status, data: postData, error: postError, fetch: fetchReadPost } = useReadPost();

  useEffect(() => {
    fetchReadPost();
  }, [fetchReadPost]);

  return (
    <BaseLayout>
      <StyledViewWrapper>
        {status === 'SUCCESS' && postData && <PostCard data={postData} initCommentListOpen />}
        {status === 'FAIL' && <Empty description={postError?.resMsg} />}
      </StyledViewWrapper>
    </BaseLayout>
  );
};

export default PostReadView;
