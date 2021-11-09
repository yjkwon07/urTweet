import PostCard from '@components/PostCard';
import BaseLayout from '@layouts/BaseLayout';
import { useReadPost } from '@modules/post';

import { StyledViewWrapper } from './styles';

const PostReadView = () => {
  const { status, data: postData } = useReadPost();

  return (
    <BaseLayout>
      <StyledViewWrapper>
        {status === 'SUCCESS' && postData && <PostCard data={postData} initCommentListOpen />}
      </StyledViewWrapper>
    </BaseLayout>
  );
};

export default PostReadView;
