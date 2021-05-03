import React, { useCallback, useMemo } from 'react';

import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { IPost } from '@modules/post/@types/db';
import { follow, unFollow, userSelector } from '@modules/user';

export interface IProps {
  data: IPost;
}

const FollowButton = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const myData = useSelector(userSelector.myData);
  const { status: followStatus } = useFetchStatus(follow.TYPE);
  const { status: unfollowStatus } = useFetchStatus(unFollow.TYPE);

  const isFollowing = useMemo(() => !!myData?.Followings.find((_) => _.id === data.User.id), [
    data.User.id,
    myData?.Followings,
  ]);

  const handleToogleFollow = useCallback(() => {
    if (isFollowing) dispatch(unFollow.requset({ userId: data.User.id }));
    else dispatch(follow.requset({ userId: data.User.id }));
  }, [data.User.id, dispatch, isFollowing]);

  if (!myData || data.User.id === myData.id) {
    return null;
  }

  return (
    <Button
      size="small"
      type={isFollowing ? undefined : 'primary'}
      icon={isFollowing ? <UserDeleteOutlined /> : <UserAddOutlined />}
      loading={followStatus === 'LOADING' || unfollowStatus === 'LOADING'}
      onClick={handleToogleFollow}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
