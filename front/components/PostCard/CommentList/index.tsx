import React from 'react';

import { Avatar, Comment, List, Tooltip } from 'antd';
import moment from 'dayjs';
import Link from 'next/link';

import { IComment } from '@modules/post/@types/db';
import { GET_USER_URL, PASS_HREF } from '@utils/urls';

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
            <Link href={GET_USER_URL(item.User.id.toString())} passHref>
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
