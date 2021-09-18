import { Skeleton } from 'antd';

import { StyledCard, StyledCardMeta } from '../UserProfile/styles';

const UserSkeleton = () => {
  return (
    <StyledCard
      actions={[
        <div key="twit">
          게시글
          <br />
        </div>,
        <div key="followings">
          팔로잉
          <br />
        </div>,
        <div key="followers">
          팔로워
          <br />
        </div>,
      ]}
    >
      <Skeleton loading avatar active>
        <StyledCardMeta />
      </Skeleton>
    </StyledCard>
  );
};

export default UserSkeleton;
