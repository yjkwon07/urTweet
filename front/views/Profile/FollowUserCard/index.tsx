import React from 'react';

import { UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Link from 'next/link';

import { StyledCard } from '@components/PostCard/styles';
import { UserInfo } from '@modules/user/@types';
import { GET_USER_URL, PASS_HREF } from '@utils/urls';

import { StyledButton, StyledTitle } from './styles';

export interface IProps {
  data: UserInfo;
  loading?: boolean;
  onCancel: (userId: number) => void;
}

const FollowUserCard = ({ data, loading, onCancel }: IProps) => {
  return (
    <StyledCard>
      <Card.Meta
        avatar={
          <Link href={GET_USER_URL(data.id.toString())} passHref>
            <a href={PASS_HREF}>
              <Avatar>{data.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={
          <StyledTitle>
            <div className="nickname">{data.nickname}</div>
            <div>
              <StyledButton
                key="stop"
                shape="round"
                type="primary"
                ghost
                danger
                icon={<UserDeleteOutlined />}
                loading={loading}
                onClick={() => onCancel(data.id)}
              >
                Unfollow
              </StyledButton>
            </div>
          </StyledTitle>
        }
      />
    </StyledCard>
  );
};

export default FollowUserCard;
