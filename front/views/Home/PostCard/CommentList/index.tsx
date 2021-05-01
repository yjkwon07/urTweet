import React, { VFC } from 'react';

import { Avatar, Comment, List, Tooltip } from 'antd';
import moment from 'dayjs';
import Link from 'next/link';

import { IPost } from '@modules/post/@types/db';
import { GET_USER_URL, PASS_HREF } from '@utils/urls';

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
                <Avatar>{item.User.nickname}</Avatar>
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
