import { Empty } from 'antd';

import PostCard from '@components/PostCard';
import BaseLayout from '@layouts/BaseLayout';
import { ReadPostUrlQuery, useReadPost } from '@modules/post';
import { useSearchFilter } from '@modules/searchFilter';

import { StyledViewWrapper } from './styles';

const PostReadView = () => {
  const { filter } = useSearchFilter<ReadPostUrlQuery>('READ_POST');
  const { status, data: postData, error: postError } = useReadPost(filter);

  return (
    <BaseLayout>
      <StyledViewWrapper>
        {status === 'SUCCESS' && postData && <PostCard data={postData} initCommentListOpen />}
        {status === 'FAIL' && <Empty description={postError.resMsg} />}
      </StyledViewWrapper>
    </BaseLayout>
  );
};

export default PostReadView;
