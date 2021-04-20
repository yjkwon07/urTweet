import React, { useCallback, useMemo, VFC } from 'react';

import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { IPost } from '@modules/post/@types/db';
import { follow, unFollow, userSelector } from '@modules/user';

export interface IProps {
  data: IPost;
}

const FollowButton: VFC<IProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { status: followStatus } = useFetchStatus(follow.TYPE);
  const { status: unfollowStatus } = useFetchStatus(unFollow.TYPE);
  const myData = useSelector(userSelector.myData);

  const isFollowing = useMemo(() => myData?.Followings.find((v) => v.id === data.User.id), [
    data.User.id,
    myData?.Followings,
  ]);

  const handleToogleFollow = useCallback(() => {
    // ...
  }, []);

  if (!myData || data.User.id === myData.id) {
    return null;
  }
  return (
    <Button loading={followStatus === 'LOADING' || unfollowStatus === 'LOADING'} onClick={handleToogleFollow}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
