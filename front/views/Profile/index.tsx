import { useCallback, useEffect } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { List, message, Modal } from 'antd';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import BaseLayout from '@layouts/BaseLayout';
import { useListReadFollower, useListReadFollowing, userAction, useReadMyUser } from '@modules/user';
import { getUserId } from '@utils/auth';

import EditMyDataForm from './EditMyUserForm';
import FollowUserCard from './FollowUserCard';
import { StyledButton, StyledCenter } from './styles';
import { ProfilePageFilter } from './utils';

const { confirm } = Modal;

const ProfileView = () => {
  const dispatch = useDispatch();

  const { data: myData, status: myDataStatus } = useReadMyUser();

  const {
    data: followingListData,
    status: followingListStatus,
    curPage: followingListCurPage,
    rowsPerPage: followingListRowPerPage,
    isMoreRead: followingListIsMoreRead,
    fetch: fetchListReadFollowing,
  } = useListReadFollowing();

  const {
    data: followerListData,
    status: followerStatus,
    curPage: followerCurPage,
    rowsPerPage: followerRowPerPage,
    isMoreRead: followerIsMoreRead,
    fetch: fetchListReadFollower,
  } = useListReadFollower();

  const handleLoadMoreFollowingList = useCallback(() => {
    if (followingListIsMoreRead) {
      fetchListReadFollowing({ page: followingListCurPage + 1, pageSize: followingListRowPerPage });
    }
  }, [fetchListReadFollowing, followingListCurPage, followingListIsMoreRead, followingListRowPerPage]);

  const handleCancelFollowing = useCallback(
    (userId) => {
      confirm({
        title: '정말로 언팔로우 하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        content: '언팔로우시 해당 멤버의 활동을 자세히 알 수 없게 됩니다.',
        onOk() {
          dispatch(userAction.fetchRemoveFollowerMe.request({ userId }));
        },
      });
    },
    [dispatch],
  );

  const handleLoadMoreFollowerList = useCallback(() => {
    if (followerIsMoreRead) {
      fetchListReadFollower({ page: followerCurPage + 1, pageSize: followerRowPerPage });
    }
  }, [fetchListReadFollower, followerCurPage, followerIsMoreRead, followerRowPerPage]);

  const handleCancelFollower = useCallback(
    (userId) => {
      confirm({
        title: '정말로 언팔로우 하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        content: '언팔로우시 해당 멤버가 나의 활동을 자세히 알 수 없게 됩니다.',
        onOk() {
          dispatch(userAction.fetchRemoveFollowerMe.request({ userId }));
        },
      });
    },
    [dispatch],
  );

  useEffect(() => {
    if (!getUserId() || (myDataStatus === 'FAIL' && !myData)) {
      message.warn('로그인 후 이용해 주시길 바랍니다.');
      Router.push('/');
    }
  }, [myData, myDataStatus]);

  useEffect(() => {
    fetchListReadFollowing({
      page: ProfilePageFilter.defaultOption.DEFAULT_FOLLOWER_CUR_PAGE,
      pageSize: ProfilePageFilter.defaultOption.DEFAULT_FOLLOWER_PER_PAGE,
    });
  }, [fetchListReadFollowing]);

  useEffect(() => {
    fetchListReadFollower({
      page: ProfilePageFilter.defaultOption.DEFAULT_FOLLOWING_CUR_PAGE,
      pageSize: ProfilePageFilter.defaultOption.DEFAULT_FOLLOWING_PER_PAGE,
    });
  }, [fetchListReadFollower]);

  return (
    <BaseLayout>
      <EditMyDataForm />
      <List
        className="mb-20"
        grid={{ gutter: 4, xs: 2, md: 2, xl: 2 }}
        size="small"
        header={<div>팔로잉</div>}
        loadMore={
          followingListIsMoreRead && (
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
          followerIsMoreRead && (
            <StyledCenter>
              <StyledButton
                className="mb-10"
                onClick={handleLoadMoreFollowerList}
                loading={followerStatus === 'LOADING'}
              >
                더 보기
              </StyledButton>
            </StyledCenter>
          )
        }
        bordered
        dataSource={followerListData}
        renderItem={(user) => (
          <List.Item>
            <FollowUserCard data={user} loading={followerStatus === 'LOADING'} onCancel={handleCancelFollower} />
          </List.Item>
        )}
      />
    </BaseLayout>
  );
};

export default ProfileView;
