import React, { useCallback, useMemo, useState } from 'react';

import { ExclamationCircleOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { useFetchStatus } from '@modules/fetchStatus';
import { follow, unFollow, useReadMyUser } from '@modules/user';

import { StyledButton } from './styles';

const { confirm } = Modal;

interface IProps {
  userId: number;
}

const FollowButton = ({ userId }: IProps) => {
  const dispatch = useDispatch();
  const { status: followStatus } = useFetchStatus(follow.TYPE, userId);
  const { status: unfollowStatus } = useFetchStatus(unFollow.TYPE, userId);
  const { data: myData } = useReadMyUser();

  const isFollowing = useMemo(
    () => !!myData?.Followings.find((Following) => Following.id === userId),
    [userId, myData?.Followings],
  );

  const [showUnfollow, setShowUnfollow] = useState(false);

  const handleFollow = useCallback(() => {
    dispatch(follow.request({ userId }, { actionList: [userId] }));
  }, [userId, dispatch]);

  const handleShowUnfollowConfirm = useCallback(() => {
    confirm({
      title: '정말로 언팔로우 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '언팔로우시 해당 멤버의 활동을 자세히 알 수 없게 됩니다.',
      onOk() {
        dispatch(unFollow.request({ userId }, { actionList: [userId] }));
      },
    });
  }, [userId, dispatch]);

  return (
    <>
      {isFollowing ? (
        <StyledButton
          shape="round"
          type="primary"
          ghost
          danger={showUnfollow}
          icon={showUnfollow && <UserDeleteOutlined />}
          loading={unfollowStatus === 'LOADING'}
          onMouseEnter={() => setShowUnfollow(true)}
          onMouseLeave={() => setShowUnfollow(false)}
          onClick={handleShowUnfollowConfirm}
        >
          {showUnfollow ? 'Unfollow' : 'Following'}
        </StyledButton>
      ) : (
        <StyledButton
          shape="round"
          type="primary"
          ghost
          icon={<UserAddOutlined />}
          loading={followStatus === 'LOADING'}
          onClick={handleFollow}
        >
          Follow
        </StyledButton>
      )}
    </>
  );
};

export default FollowButton;
