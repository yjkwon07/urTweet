import { useCallback, useMemo } from 'react';

import { Empty, Pagination, Space, Spin } from 'antd';
import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import { useListReadPost } from '@modules/post';

import { PostListReadPageFilter } from '../utils';
import { StyledCenter, StyledViewWrapper } from './styles';

const PaginationRead = () => {
  const router = useRouter();
  const postListReadPageFilter = useMemo(() => new PostListReadPageFilter(router.query), [router.query]);
  const { query } = postListReadPageFilter;

  const { status, data: postListData, error: PostListError, totalCount } = useListReadPost();

  const handleChangePage = useCallback(
    (page: number) => {
      postListReadPageFilter.search({ page });
    },
    [postListReadPageFilter],
  );

  return (
    <StyledViewWrapper>
      <Space className="wrapper" direction="vertical" size={10}>
        {status === 'SUCCESS' && postListData.map((post) => <PostCard key={post.id} data={post} />)}
        {status === 'LOADING' && (
          <StyledCenter>
            <Spin />
          </StyledCenter>
        )}
        {status === 'FAIL' && (
          <StyledCenter>
            <Empty description={PostListError?.resMsg} />
          </StyledCenter>
        )}
      </Space>
      <StyledCenter>
        <Pagination
          showSizeChanger={false}
          current={query.page}
          total={totalCount}
          onChange={handleChangePage}
          pageSize={query.pageSize}
        />
      </StyledCenter>
    </StyledViewWrapper>
  );
};

export default PaginationRead;
