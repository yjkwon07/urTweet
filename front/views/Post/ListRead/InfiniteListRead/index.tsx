import { useCallback, useMemo } from 'react';

import { Empty, Space, Spin } from 'antd';
import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import useEndReachScroll from '@hooks/useEndReachScroll';
import { useListReadPost } from '@modules/post';
import { useReadMyUser } from '@modules/user';

import PostForm from '../PostForm';
import { PostListReadPageFilter } from '../utils';
import { StyledCenter, StyledFormBlock, StyledViewWrapper } from './styles';

const InfiniteListRead = () => {
  const router = useRouter();
  const postListReadPageFilter = useMemo(() => new PostListReadPageFilter(router.query), [router.query]);
  const { query } = postListReadPageFilter;

  const { data: myData } = useReadMyUser();
  const { status, data: postListData, curPage, isMoreRead, fetch: fetchListPost } = useListReadPost();

  const handleNextPage = useCallback(() => {
    if (isMoreRead) {
      const { pageSize, hashtag, mode } = query;
      fetchListPost({ page: curPage + 1, pageSize, hashtag }, mode);
    }
  }, [curPage, fetchListPost, isMoreRead, query]);

  useEndReachScroll({ callback: handleNextPage });

  return (
    <StyledViewWrapper>
      <Space className="wrapper" direction="vertical" size={10}>
        {myData && !query.hashtag && (
          <>
            <PostForm />
            <StyledFormBlock />
          </>
        )}
        {postListData.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
        {status === 'SUCCESS' && !postListData.length && (
          <StyledCenter>
            <Empty description="조회하신 결과가 없습니다." />
          </StyledCenter>
        )}
        {status === 'LOADING' && (
          <StyledCenter>
            <Spin />
          </StyledCenter>
        )}
      </Space>
    </StyledViewWrapper>
  );
};

export default InfiniteListRead;
