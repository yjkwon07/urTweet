import { Avatar, Comment, List, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';

import { Comment as IComment } from '@modules/post/@types/db';
import { PASS_HREF } from '@utils/urls';
import { UserReadPageFilter } from '@views/User/Read/utils';

interface IProps {
  commentList: IComment[];
}

const CommentList = ({ commentList }: IProps) => (
  <List
    itemLayout="horizontal"
    dataSource={commentList}
    renderItem={(item) => (
      <li>
        <Comment
          author={item.User.nickname}
          avatar={
            <Link href={new UserReadPageFilter({ id: item.User.id }, { userId: item.User.id }).url} passHref>
              <a href={PASS_HREF}>
                <Avatar>{item.User.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          content={item.content}
          datetime={
            <Tooltip title={dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{dayjs(item.createdAt).fromNow()}</span>
            </Tooltip>
          }
        />
      </li>
    )}
  />
);

export default CommentList;
