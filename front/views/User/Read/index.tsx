import React, { useCallback } from 'react';

import { Empty, Space, Spin } from 'antd';

import PostCard from '@components/PostCard';
import useEndReachScroll from '@hooks/useEndReachScroll';
import BaseLayout from '@layouts/BaseLayout';
import { ListReadPostUrlQuery, useListReadPost } from '@modules/post';
import { useSearchFilter } from '@modules/searchFilter';
import { ReadUserUrlQuery } from '@modules/user';
import useUser from '@modules/user/hooks/useReadUser';

import { StyledCenter, StyledViewWrapper } from './styles';
import UserInfo from './UserInfo';

const UserRead = () => {
  const { filter: readUserFilter } = useSearchFilter<ReadUserUrlQuery>('READ_USER');
  const { filter: listReadPostFilter, changeFilter } = useSearchFilter<ListReadPostUrlQuery>('LIST_READ_POST');
  const { data: userData } = useUser(readUserFilter);
  const {
    status,
    data: postListData,
    error: PostListError,
    isMoreRead,
  } = useListReadPost({ filter: listReadPostFilter, mode: 'infinite' });

  const handleNextPage = useCallback(() => {
    if (listReadPostFilter?.page && isMoreRead) {
      changeFilter({
        page: listReadPostFilter.page + 1,
      });
    }
  }, [changeFilter, listReadPostFilter?.page, isMoreRead]);

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
                  <Empty description={PostListError.resMsg} />
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
