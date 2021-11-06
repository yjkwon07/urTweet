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
  const {
    status,
    data: postListData,
    error: PostListError,
    curPage,
    isMoreRead,
    fetch: fetchListPost,
  } = useListReadPost();

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
        {status !== 'FAIL' && postListData.map((post) => <PostCard key={post.id} data={post} />)}
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
    </StyledViewWrapper>
  );
};

export default InfiniteListRead;
