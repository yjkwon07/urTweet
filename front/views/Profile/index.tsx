import { useCallback, useEffect, useState } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { List, message, Modal } from 'antd';
import Router from 'next/router';

import BaseLayout from '@layouts/BaseLayout';
import {
  ListReadFollowerUrlQuery,
  ListReadFollowingUrlQuery,
  requestRemoveFollowerMe,
  requestUnfollow,
  useListReadFollower,
  useListReadFollowing,
  useReadMyUser,
} from '@modules/user';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import EditMyDataForm from './EditMyUserForm';
import FollowUserCard from './FollowUserCard';
import { StyledButton, StyledCenter } from './styles';
import { ProfilePageFilter } from './utils';

const { confirm } = Modal;

const ProfileView = () => {
  const { isValidating, data: myData, error, mutate } = useReadMyUser();

  const [followingListQuery, setFollowingListQuery] = useState<ListReadFollowingUrlQuery>({
    page: ProfilePageFilter.defaultOption.DEFAULT_FOLLOWER_CUR_PAGE,
    pageSize: ProfilePageFilter.defaultOption.DEFAULT_FOLLOWER_PER_PAGE,
  });
  const {
    data: followingListData,
    isValidating: isFollowingValidating,
    isReachingEndData: isFollowingReachingEndData,
    mutate: followingMutate,
  } = useListReadFollowing(followingListQuery);

  const [followerListQuery, setFollowerListQuery] = useState<ListReadFollowerUrlQuery>({
    page: ProfilePageFilter.defaultOption.DEFAULT_FOLLOWER_CUR_PAGE,
    pageSize: ProfilePageFilter.defaultOption.DEFAULT_FOLLOWER_PER_PAGE,
  });
  const {
    data: followerListData,
    isValidating: isFollowerValidating,
    isReachingEndData: isFollowerReachingEndData,
    mutate: followerMutate,
  } = useListReadFollower(followerListQuery);

  const handleLoadMoreFollowingList = useCallback(() => {
    if (isFollowingReachingEndData) {
      setFollowingListQuery(
        (prevFollowerListQuery) =>
          prevFollowerListQuery && {
            ...prevFollowerListQuery,
            page: prevFollowerListQuery.page + 1,
          },
      );
    }
  }, [isFollowingReachingEndData]);

  const handleCancelFollowing = useCallback(
    (userId) => {
      confirm({
        title: '정말로 언팔로우 하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        content: '언팔로우시 해당 멤버의 활동을 자세히 알 수 없게 됩니다.',
        async onOk() {
          try {
            await requestUnfollow({ userId });
            await followingMutate();
            mutate();
          } catch (error) {
            if (isCustomAxiosError(error)) {
              message.error(JSON.stringify(error.response.data.resMsg));
            }
          }
        },
      });
    },
    [followingMutate, mutate],
  );

  const handleLoadMoreFollowerList = useCallback(() => {
    if (isFollowerReachingEndData) {
      setFollowerListQuery(
        (prevFollowerListQuery) =>
          prevFollowerListQuery && {
            ...prevFollowerListQuery,
            page: prevFollowerListQuery.page + 1,
          },
      );
    }
  }, [isFollowerReachingEndData]);

  const handleCancelFollower = useCallback(
    (userId) => {
      confirm({
        title: '정말로 언팔로우 하시겠습니까?',
        icon: <ExclamationCircleOutlined />,
        content: '언팔로우시 해당 멤버가 나의 활동을 자세히 알 수 없게 됩니다.',
        async onOk() {
          try {
            await requestRemoveFollowerMe({ userId });
            await followerMutate();
            mutate();
          } catch (error) {
            if (isCustomAxiosError(error)) {
              message.error(JSON.stringify(error.response.data.resMsg));
            }
          }
        },
      });
    },
    [followerMutate, mutate],
  );

  useEffect(() => {
    if ((!isValidating && !myData) || error) {
      message.warn('로그인 후 이용해 주시길 바랍니다.');
      Router.push('/');
    }
  }, [error, isValidating, myData]);

  if (isValidating || !myData) return null;
  return (
    <BaseLayout>
      <EditMyDataForm />
      <List
        className="mb-20"
        grid={{ gutter: 4, xs: 2, md: 2, xl: 2 }}
        size="small"
        header={<div>팔로잉</div>}
        loadMore={
          isFollowingReachingEndData && (
            <StyledCenter>
              <StyledButton className="mb-10" onClick={handleLoadMoreFollowingList} loading={isFollowingValidating}>
                더 보기
              </StyledButton>
            </StyledCenter>
          )
        }
        bordered
        dataSource={followingListData}
        renderItem={(user) => (
          <List.Item>
            <FollowUserCard data={user} loading={isFollowingValidating} onCancel={handleCancelFollowing} />
          </List.Item>
        )}
      />
      <List
        grid={{ gutter: 4, xs: 2, md: 2, xl: 2 }}
        size="small"
        header={<div>팔로워</div>}
        loadMore={
          isFollowerReachingEndData && (
            <StyledCenter>
              <StyledButton className="mb-10" onClick={handleLoadMoreFollowerList} loading={isFollowerValidating}>
                더 보기
              </StyledButton>
            </StyledCenter>
          )
        }
        bordered
        dataSource={followerListData}
        renderItem={(user) => (
          <List.Item>
            <FollowUserCard data={user} loading={isFollowerValidating} onCancel={handleCancelFollower} />
          </List.Item>
        )}
      />
    </BaseLayout>
  );
};

export default ProfileView;
