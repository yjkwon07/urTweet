import { useCallback, useMemo, useState } from 'react';

import { ExclamationCircleOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';

import { requestFollow, requestUnfollow, useReadMyUser } from '@modules/user';
import isCustomAxiosError from '@utils/isCustomAxiosError';

import { StyledButton } from './styles';

const { confirm } = Modal;

interface IProps {
  userId: number;
}

const FollowButton = ({ userId }: IProps) => {
  const [isFetchFollowPost, setIsFetchFollowPost] = useState(false);
  const [isFetchUnFollowPost, setIsFetchUnFollowPost] = useState(false);

  const { data: myData, mutate } = useReadMyUser();
  const isFollowing = useMemo(
    () => !!myData?.Followings.find((Following) => Following.id === userId),
    [userId, myData?.Followings],
  );

  const [showUnfollow, setShowUnfollow] = useState(false);

  const handleFollow = useCallback(async () => {
    try {
      setIsFetchFollowPost(true);
      await requestFollow({ userId });
      mutate();
    } catch (error) {
      if (isCustomAxiosError(error)) {
        message.error(JSON.stringify(error.response.data.resMsg));
      }
    } finally {
      setIsFetchFollowPost(false);
    }
  }, [mutate, userId]);

  const handleShowUnfollowConfirm = useCallback(() => {
    confirm({
      title: '정말로 언팔로우 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '언팔로우시 해당 멤버의 활동을 자세히 알 수 없게 됩니다.',
      async onOk() {
        try {
          setIsFetchUnFollowPost(true);
          await requestUnfollow({ userId });
          mutate();
        } catch (error) {
          if (isCustomAxiosError(error)) {
            message.error(JSON.stringify(error.response.data.resMsg));
          }
        } finally {
          setIsFetchUnFollowPost(false);
        }
      },
    });
  }, [mutate, userId]);

  return (
    <>
      {isFollowing && (
        <StyledButton
          shape="round"
          type="primary"
          ghost
          danger={showUnfollow}
          icon={showUnfollow && <UserDeleteOutlined />}
          loading={isFetchUnFollowPost}
          onMouseEnter={() => setShowUnfollow(true)}
          onMouseLeave={() => setShowUnfollow(false)}
          onClick={handleShowUnfollowConfirm}
        >
          {showUnfollow ? 'Unfollow' : 'Following'}
        </StyledButton>
      )}
      {myData && !isFollowing && myData.id !== userId && (
        <StyledButton
          shape="round"
          type="primary"
          ghost
          icon={<UserAddOutlined />}
          loading={isFetchFollowPost}
          onClick={handleFollow}
        >
          Follow
        </StyledButton>
      )}
    </>
  );
};

export default FollowButton;
