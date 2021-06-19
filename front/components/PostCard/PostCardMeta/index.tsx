import React from 'react';

import { Card, Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'dayjs';
import Link from 'next/link';

import { GET_USER_URL, PASS_HREF } from '@utils/urls';

import { Title } from './styles';

export interface IProps {
  userId: string;
  nickname: string;
  createdAt: string;
  actions?: React.ReactNode;
  description?: React.ReactNode;
}

const PostCardMeta = ({ userId, nickname, createdAt, actions, description }: IProps) => {
  return (
    <Card.Meta
      avatar={
        <Link href={GET_USER_URL(userId)} passHref>
          <a href={PASS_HREF}>
            <Avatar>{nickname[0]}</Avatar>
          </a>
        </Link>
      }
      title={
        <Title>
          <div>
            {nickname}
            <Tooltip title={moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}>
              <span style={{ color: '#ccc', marginLeft: '10px', fontSize: '14px' }}>{moment(createdAt).fromNow()}</span>
            </Tooltip>
          </div>
          {actions && <div>{actions}</div>}
        </Title>
      }
      description={description}
    />
  );
};

export default PostCardMeta;
