import React, { useCallback, useMemo } from 'react';

import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { follow, unFollow, userSelector } from '@modules/user';

interface IProps {
  userId: number;
}

const FollowButton = ({ userId }: IProps) => {
  const dispatch = useDispatch();
  const myData = useSelector(userSelector.myData);
  const { status: followStatus } = useFetchStatus(follow.TYPE);
  const { status: unfollowStatus } = useFetchStatus(unFollow.TYPE);

  const isFollowing = useMemo(() => !!myData?.Followings.find((_) => _.id === userId), [userId, myData?.Followings]);

  const handleToggleFollow = useCallback(() => {
    if (isFollowing) dispatch(unFollow.requset({ userId }));
    else dispatch(follow.requset({ userId }));
  }, [userId, dispatch, isFollowing]);

  if (!myData || userId === myData.id) {
    return null;
  }

  return (
    <Button
      size="small"
      type={isFollowing ? undefined : 'primary'}
      icon={isFollowing ? <UserDeleteOutlined /> : <UserAddOutlined />}
      loading={followStatus === 'LOADING' || unfollowStatus === 'LOADING'}
      onClick={handleToggleFollow}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
