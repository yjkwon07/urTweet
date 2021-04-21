import React, { VFC } from 'react';

import { Avatar, Comment, List, Tooltip } from 'antd';
import moment from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';

import { IPost } from '@modules/post/@types/db';
import { GET_USER_URL, PASS_HREF } from '@utils/urls';

moment.locale('ko');
moment.extend(relativeTime);

export interface IProps {
  data: IPost;
}

const CommentList: VFC<IProps> = ({ data }) => (
  <List
    itemLayout="horizontal"
    dataSource={data.Comments}
    renderItem={(item) => (
      <li>
        <Comment
          author={item.User.nickname}
          avatar={
            <Link href={GET_USER_URL(item.User.id.toString())} prefetch={false} passHref>
              <a href={PASS_HREF}>
                <Avatar>{item.User.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          content={item.content}
          datetime={
            <Tooltip title={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(item.createdAt).fromNow()}</span>
            </Tooltip>
          }
        />
      </li>
    )}
  />
);

export default CommentList;
