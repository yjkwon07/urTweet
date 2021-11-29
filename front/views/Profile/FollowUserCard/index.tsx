import { useState } from 'react';

import { UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Link from 'next/link';

import { StyledCard } from '@components/PostCard/styles';
import { UserInfo } from '@modules/user/@types';
import { PASS_HREF } from '@utils/urls';
import { UserReadPageFilter } from '@views/User/Read/utils';

import { StyledButton, StyledTitle } from './styles';

export interface IProps {
  data: UserInfo;
  loading?: boolean;
  onCancel: (userId: number) => void;
}

const FollowUserCard = ({ data, loading, onCancel }: IProps) => {
  const [showUnfollow, setShowUnfollow] = useState(false);

  return (
    <StyledCard>
      <Card.Meta
        avatar={
          <Link href={new UserReadPageFilter({ id: data.id }, { userId: data.id }).url} passHref>
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
                shape="round"
                type="primary"
                ghost
                danger={showUnfollow}
                icon={showUnfollow && <UserDeleteOutlined />}
                loading={loading}
                onMouseEnter={() => setShowUnfollow(true)}
                onMouseLeave={() => setShowUnfollow(false)}
                onClick={() => onCancel(data.id)}
              >
                {showUnfollow ? 'Unfollow' : 'Following'}
              </StyledButton>
            </div>
          </StyledTitle>
        }
      />
    </StyledCard>
  );
};

export default FollowUserCard;
