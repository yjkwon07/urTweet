import React, { useCallback, useMemo } from 'react';

import { Empty, Space, Spin } from 'antd';
import { useRouter } from 'next/router';

import PostCard from '@components/PostCard';
import useEndReachScroll from '@hooks/useEndReachScroll';
import BaseLayout from '@layouts/BaseLayout';
import { useListReadPost } from '@modules/post';
import useUser from '@modules/user/hooks/useReadUser';

import { StyledCenter, StyledViewWrapper } from './styles';
import UserInfo from './UserInfo';
import { UserReadPageFilter } from './utils';

const UserRead = () => {
  const router = useRouter();
  const { data: userData } = useUser();
  const postListReadPageFilter = useMemo(() => new UserReadPageFilter(router.query), [router.query]);
  const { query } = postListReadPageFilter;

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
      const { pageSize, userId, mode } = query;
      fetchListPost({ page: curPage + 1, pageSize, userId }, mode);
    }
  }, [curPage, fetchListPost, isMoreRead, query]);

  useEndReachScroll({ callback: handleNextPage });

  return (
    <BaseLayout>
      <StyledViewWrapper>
        <Space className="wrapper" direction="vertical" size={10}>
          {userData && (
            <>
              <UserInfo data={userData} />
              {status !== 'FAIL' && postListData.map((data) => <PostCard key={data.id} data={data} />)}
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
            </>
          )}
        </Space>
      </StyledViewWrapper>
    </BaseLayout>
  );
};

export default UserRead;
