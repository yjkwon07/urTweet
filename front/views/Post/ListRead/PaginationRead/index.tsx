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

  const {
    isValidating,
    data: postListData,
    totalCount,
  } = useListReadPost({
    page: query.page,
    pageSize: query.pageSize,
    hashtag: query.hashtag,
  });

  const handleChangePage = useCallback(
    (page: number) => {
      postListReadPageFilter.search({ page });
    },
    [postListReadPageFilter],
  );

  return (
    <StyledViewWrapper>
      <Space className="wrapper" direction="vertical" size={10}>
        {postListData?.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
        {!isValidating && !postListData?.length && (
          <StyledCenter>
            <Empty description="조회하신 결과가 없습니다." />
          </StyledCenter>
        )}
        {isValidating && (
          <StyledCenter>
            <Spin />
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
