import { useCallback, useMemo } from 'react';

import { Empty, Space, Spin } from 'antd';
import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import useEndReachScroll from '@hooks/useEndReachScroll';
import { useInfiniteListReadPost } from '@modules/post';
import { useReadMyUser } from '@modules/user';

import PostForm from '../PostForm';
import { PostListReadPageFilter } from '../utils';
import { StyledCenter, StyledFormBlock, StyledViewWrapper } from './styles';

const InfiniteListRead = () => {
  const router = useRouter();
  const postListReadPageFilter = useMemo(() => new PostListReadPageFilter(router.query), [router.query]);
  const { query } = postListReadPageFilter;

  const { data: myData } = useReadMyUser();
  const {
    data: postPageListData,
    isLoading,
    isReachingEndData,
    handleMoreRead,
  } = useInfiniteListReadPost({
    page: query.page,
    pageSize: query.pageSize,
    hashtag: query.hashtag,
  });
  const postListData = useMemo(() => postPageListData && postPageListData.flat(), [postPageListData]);

  const handleNextPage = useCallback(async () => {
    try {
      if (!isReachingEndData && !isLoading) {
        await handleMoreRead();
      }
    } catch (error) {
      console.error('error :>> ', error);
    }
  }, [handleMoreRead, isLoading, isReachingEndData]);

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
        {postListData?.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
        {!isLoading && !postListData?.length && (
          <StyledCenter>
            <Empty description="조회하신 결과가 없습니다." />
          </StyledCenter>
        )}
        {isLoading && (
          <StyledCenter>
            <Spin />
          </StyledCenter>
        )}
      </Space>
    </StyledViewWrapper>
  );
};

export default InfiniteListRead;
