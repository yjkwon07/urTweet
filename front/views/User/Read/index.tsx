import React, { useCallback, useEffect } from 'react';

import { Empty, Space, Spin } from 'antd';

import PostCard from '@components/PostCard';
import useEndReachScroll from '@hooks/useEndReachScroll';
import BaseLayout from '@layouts/BaseLayout';
import { useListReadPost } from '@modules/post';
import useUser from '@modules/user/hooks/useReadUser';

import { StyledCenter, StyledViewWrapper } from './styles';
import UserInfo from './UserInfo';

const UserRead = () => {
  const { data: userData, fetch: fetchReadUser } = useUser();

  const {
    status,
    data: postListData,
    error: PostListError,
    isMoreRead,
    filter: listReadPostFilter,
    changeFilter: changeListReadPostFilter,
    fetch: fetchListReadPost,
  } = useListReadPost();

  const handleNextPage = useCallback(() => {
    if (listReadPostFilter?.page && isMoreRead) {
      changeListReadPostFilter({
        page: listReadPostFilter.page + 1,
      });
    }
  }, [changeListReadPostFilter, listReadPostFilter?.page, isMoreRead]);

  useEndReachScroll({ callback: handleNextPage });

  useEffect(() => {
    fetchReadUser();
  }, [fetchReadUser]);

  useEffect(() => {
    fetchListReadPost();
  }, [fetchListReadPost]);

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
