import React, { useCallback, useEffect } from 'react';

import { message } from 'antd';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import AppLayout from '@layouts/App';
import { userSelector } from '@modules/user';
import useListFollow from '@modules/user/hooks/useListFollow';
import useListFollowing from '@modules/user/hooks/useListFollowing';

import FollowList from './FollowList';
import NicknameEditForm from './NicknameEditForm';

const Profile = () => {
  const myData = useSelector(userSelector.myData);
  const {
    data: followingListData,
    setPageSize: setPageSizefollowing,
    status: followingStatus,
    isReachingData: isReachingFollowingData,
  } = useListFollowing();
  const {
    data: followListData,
    setPageSize: setPageSizefollow,
    status: followStatus,
    isReachingData: isReachingFollowData,
  } = useListFollow();

  const handleLoadMoreFollowing = useCallback(() => {
    setPageSizefollowing((prev) => prev + 3);
  }, [setPageSizefollowing]);

  const handleloadMoreFollower = useCallback(() => {
    setPageSizefollow((prev) => prev + 3);
  }, [setPageSizefollow]);

  useEffect(() => {
    if (!(myData && myData.id)) {
      message.warn('로그인 후 이용해 주시길 바랍니다.');
      Router.push('/');
    }
  }, [myData]);

  if (!myData) return null;

  return (
    <AppLayout>
      <Head>
        <title>내 프로필 | urTweet</title>
      </Head>

      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={followingListData}
        loading={followingStatus === 'LOADING'}
        onClickMore={handleLoadMoreFollowing}
        active={!isReachingFollowingData}
      />
      <FollowList
        header="팔로워"
        data={followListData}
        loading={followStatus === 'LOADING'}
        onClickMore={handleloadMoreFollower}
        active={!isReachingFollowData}
      />
    </AppLayout>
  );
};

export default Profile;
