import React, { VFC } from 'react';

import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';

const dummy = {
  id: 1234,
  Posts: [],
  Followings: [],
  Followers: [],
  nickname: 'okok',
};

const UserProfile: VFC = () => {
  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${dummy.id}`}>
            <a>
              짹짹
              <br />
              {dummy.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {dummy.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {dummy.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${dummy.id}`} prefetch={false}>
            <Avatar>{dummy.nickname[0]}</Avatar>
          </Link>
        }
        title={dummy.nickname}
      />
      <Button>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
