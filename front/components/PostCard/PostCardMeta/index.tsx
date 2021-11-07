import { Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import dayjs from 'dayjs';
import Link from 'next/link';

import { PASS_HREF } from '@utils/urls';
import { UserReadPageFilter } from '@views/User/Read/utils';

import { StyledCardMeta, StyledTitle } from './styles';

export interface IProps {
  userId: string;
  nickname: string;
  createdAt: string;
  actions?: React.ReactNode;
  description?: React.ReactNode;
}

const PostCardMeta = ({ userId, nickname, createdAt, actions, description }: IProps) => {
  return (
    <StyledCardMeta
      avatar={
        <Link href={new UserReadPageFilter({ id: userId }, { userId }).url} passHref>
          <a href={PASS_HREF}>
            <Avatar>{nickname[0]}</Avatar>
          </a>
        </Link>
      }
      title={
        <StyledTitle>
          <div>
            {nickname}
            <Tooltip title={dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}>
              <span className="time-text">{dayjs(createdAt).fromNow()}</span>
            </Tooltip>
          </div>
          {actions && <div>{actions}</div>}
        </StyledTitle>
      }
      description={description}
    />
  );
};

export default PostCardMeta;
