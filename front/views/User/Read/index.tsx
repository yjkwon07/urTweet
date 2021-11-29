import { useCallback, useMemo } from 'react';

import { Empty, Space, Spin } from 'antd';
import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import useEndReachScroll from '@hooks/useEndReachScroll';
import BaseLayout from '@layouts/BaseLayout';
import { useInfiniteListReadPost } from '@modules/post';
import useUser from '@modules/user/hooks/useReadUser';

import { StyledCenter, StyledViewWrapper } from './styles';
import UserInfo from './UserInfo';
import { UserReadPageFilter } from './utils';

const UserRead = () => {
  const router = useRouter();
  const postListReadPageFilter = useMemo(() => new UserReadPageFilter(router.query, router.query), [router.query]);
  const { query } = postListReadPageFilter;

  const { data: userData } = useUser({ userId: query.userId });
  const {
    data: postPageListData,
    isLoading,
    isReachingEndData,
    handleMoreRead,
  } = useInfiniteListReadPost({
    page: query.page,
    pageSize: query.pageSize,
    userId: query.userId,
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
    <BaseLayout>
      <StyledViewWrapper>
        <Space className="wrapper" direction="vertical" size={10}>
          {userData && (
            <>
              <UserInfo data={userData} />
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
            </>
          )}
        </Space>
      </StyledViewWrapper>
    </BaseLayout>
  );
};

export default UserRead;
