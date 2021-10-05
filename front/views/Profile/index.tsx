import { useCallback, useEffect } from 'react';

import { List, message } from 'antd';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import BaseLayout from '@layouts/BaseLayout';
import { useSearchFilter } from '@modules/searchFilter';
import {
  ListReadFollowingUrlQuery,
  useListReadFollow,
  useListReadFollowing,
  userAction,
  useReadMyUser,
} from '@modules/user';

import EditMyDataForm from './EditMyUserForm';
import FollowUserCard from './FollowUserCard';
import { StyledButton, StyledCenter } from './styles';

const DEFAULT_CUR_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const ProfileView = () => {
  const dispatch = useDispatch();

  const { data: myData, status: myDataStatus } = useReadMyUser();

  const { filter: listReadFollowingFilter, changeFilter: listReadFollowingChangeFilter } =
    useSearchFilter<ListReadFollowingUrlQuery>('LIST_READ_FOLLOWING', {
      page: DEFAULT_CUR_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  const {
    data: followingListData,
    status: followingListStatus,
    isMoreRead: isMoreReadFollowingList,
  } = useListReadFollowing(listReadFollowingFilter);

  const { filter: listReadFollowFilter, changeFilter: listReadFollowChangeFilter } =
    useSearchFilter<ListReadFollowingUrlQuery>('LIST_READ_FOLLOW', {
      page: DEFAULT_CUR_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  const {
    data: followListData,
    status: followStatus,
    isMoreRead: isMoreReadFollowList,
  } = useListReadFollow(listReadFollowFilter);

  const handleLoadMoreFollowingList = useCallback(() => {
    if (listReadFollowingFilter?.page && isMoreReadFollowingList) {
      listReadFollowingChangeFilter({
        page: listReadFollowingFilter.page + 1,
      });
    }
  }, [isMoreReadFollowingList, listReadFollowingChangeFilter, listReadFollowingFilter?.page]);

  const handleCancelFollowing = useCallback(
    (userId) => () => {
      dispatch(userAction.unFollow.request({ userId }));
    },
    [dispatch],
  );

  const handleLoadMoreFollowerList = useCallback(() => {
    if (listReadFollowingFilter?.page && isMoreReadFollowList) {
      listReadFollowChangeFilter({
        page: listReadFollowingFilter.page + 1,
      });
    }
  }, [isMoreReadFollowList, listReadFollowChangeFilter, listReadFollowingFilter?.page]);

  const handleCancelFollower = useCallback(
    (userId) => () => {
      dispatch(userAction.removeFollowerMe.request({ userId }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (myDataStatus === 'SUCCESS' && !myData) {
      message.warn('로그인 후 이용해 주시길 바랍니다.');
      Router.push('/');
    }
  }, [myData, myDataStatus]);

  return (
    <BaseLayout>
      <EditMyDataForm />
      <List
        className="mb-20"
        grid={{ gutter: 4, xs: 2, md: 2, xl: 2 }}
        size="small"
        header={<div>팔로잉</div>}
        loadMore={
          isMoreReadFollowingList && (
            <StyledCenter>
              <StyledButton
                className="mb-10"
                onClick={handleLoadMoreFollowingList}
                loading={followingListStatus === 'LOADING'}
              >
                더 보기
              </StyledButton>
            </StyledCenter>
          )
        }
        bordered
        dataSource={followingListData}
        renderItem={(user) => (
          <List.Item>
            <FollowUserCard data={user} loading={followingListStatus === 'LOADING'} onCancel={handleCancelFollowing} />
          </List.Item>
        )}
      />
      <List
        grid={{ gutter: 4, xs: 2, md: 2, xl: 2 }}
        size="small"
        header={<div>팔로워</div>}
        loadMore={
          isMoreReadFollowList && (
            <StyledCenter>
              <StyledButton className="mb-10" onClick={handleLoadMoreFollowerList} loading={followStatus === 'LOADING'}>
                더 보기
              </StyledButton>
            </StyledCenter>
          )
        }
        bordered
        dataSource={followListData}
        renderItem={(user) => (
          <List.Item>
            <FollowUserCard data={user} loading={followStatus === 'LOADING'} onCancel={handleCancelFollower} />
          </List.Item>
        )}
      />
    </BaseLayout>
  );
};

export default ProfileView;
