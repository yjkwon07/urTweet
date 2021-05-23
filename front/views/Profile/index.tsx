import React, { useCallback, useEffect, useState } from 'react';

import { message } from 'antd';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import { listReadFollow, listReadFollowing, useMyUser } from '@modules/user';
import useListFollow from '@modules/user/hooks/useListFollow';
import useListFollowing from '@modules/user/hooks/useListFollowing';

import FollowList from './Organism/FollowList';
import NicknameEditForm from './Organism/NicknameEditForm';

const DEAFULT_PAGE_SIZE = 3;

const Profile = () => {
  const dispatch = useDispatch();
  const { data: myData, status: myDataStatus } = useMyUser({});

  const [followingPageSize, setFollowingPageSize] = useState(DEAFULT_PAGE_SIZE);
  const {
    data: followingListData,
    status: followingStatus,
    hasMoreRead: hasMoreReadFollowingListData,
  } = useListFollowing({ pageSize: followingPageSize });

  const [followPageSize, setFollowPageSize] = useState(DEAFULT_PAGE_SIZE);
  const { data: followListData, status: followStatus, hasMoreRead: hasMoreReadFollowListData } = useListFollow({
    pageSize: followPageSize,
  });

  const handleLoadMoreFollowing = useCallback(() => {
    if (hasMoreReadFollowingListData) {
      const updatePagSize = followingPageSize + DEAFULT_PAGE_SIZE;
      setFollowingPageSize(updatePagSize);
      dispatch(listReadFollowing.requset({ pageSize: updatePagSize }));
    }
  }, [dispatch, followingPageSize, hasMoreReadFollowingListData]);

  const handleloadMoreFollower = useCallback(() => {
    if (hasMoreReadFollowListData) {
      const updatePagSize = followPageSize + DEAFULT_PAGE_SIZE;
      setFollowPageSize(updatePagSize);
      dispatch(listReadFollow.requset({ pageSize: updatePagSize }));
    }
  }, [dispatch, followPageSize, hasMoreReadFollowListData]);

  useEffect(() => {
    if ((!myData && myDataStatus === 'SUCCESS') || myDataStatus === 'FAIL') {
      message.warn('로그인 후 이용해 주시길 바랍니다.');
      Router.push('/');
    }
  }, [myData, myDataStatus]);

  if (!myData) return null;

  return (
    <>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={followingListData}
        loading={followingStatus === 'LOADING'}
        onClickMore={handleLoadMoreFollowing}
        active={hasMoreReadFollowingListData}
      />
      <FollowList
        header="팔로워"
        data={followListData}
        loading={followStatus === 'LOADING'}
        onClickMore={handleloadMoreFollower}
        active={hasMoreReadFollowListData}
      />
    </>
  );
};

export default Profile;
