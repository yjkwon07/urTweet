import React, { useCallback, useMemo, useState } from 'react';

import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { follow, unFollow, userSelector } from '@modules/user';

import { StyledButton } from './styles';

interface IProps {
  userId: number;
}

const FollowButton = ({ userId }: IProps) => {
  const dispatch = useDispatch();
  const myData = useSelector(userSelector.myData);
  const { status: followStatus } = useFetchStatus(follow.TYPE);
  const { status: unfollowStatus } = useFetchStatus(unFollow.TYPE);

  const [showUnfollow, setShowUnfollow] = useState(false);

  const isFollowing = useMemo(() => !!myData?.Followings.find((_) => _.id === userId), [userId, myData?.Followings]);

  const handleToggleFollow = useCallback(() => {
    if (isFollowing) dispatch(unFollow.requset({ userId }));
    else dispatch(follow.requset({ userId }));
  }, [userId, dispatch, isFollowing]);

  if (!myData || userId === myData.id) {
    return null;
  }

  return (
    <>
      {isFollowing ? (
        <StyledButton
          shape="round"
          type="primary"
          danger={showUnfollow}
          icon={showUnfollow && <UserDeleteOutlined />}
          loading={unfollowStatus === 'LOADING'}
          onMouseEnter={() => setShowUnfollow(true)}
          onMouseLeave={() => setShowUnfollow(false)}
          onClick={handleToggleFollow}
        >
          {showUnfollow ? 'Unfollow' : 'Following'}
        </StyledButton>
      ) : (
        <StyledButton
          shape="round"
          type="primary"
          icon={<UserAddOutlined />}
          loading={followStatus === 'LOADING'}
          onClick={handleToggleFollow}
        >
          Follow
        </StyledButton>
      )}
    </>
  );
};

export default FollowButton;
