import React from 'react';

import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

import FollowButton from '@components/PostCard/FollowButton';
import { User } from '@modules/user/@types/db';

import { StyledCard, StyledTitle } from './styles';

export interface IProps {
  data: User;
}

const UserInfo = ({ data }: IProps) => {
  return (
    <StyledCard
      className="mb-10"
      actions={[
        <div key="twit">
          게시글
          <br />
          {data.Posts}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {data.Followings}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {data.Followers}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{data.nickname[0]}</Avatar>}
        title={
          <StyledTitle>
            <div className="nickname">{data.nickname}</div>
            <FollowButton userId={data.id} />
          </StyledTitle>
        }
      />
    </StyledCard>
  );
};

export default UserInfo;
