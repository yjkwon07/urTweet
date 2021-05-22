import React from 'react';

import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

import { IUser } from '@modules/user/@types/db';

export interface IProps {
  data: IUser;
}

const UserInfo = ({ data }: IProps) => {
  return (
    <div style={{ padding: 5, background: '#ececec', marginBottom: 20 }}>
      <Card
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
        <Card.Meta avatar={<Avatar>{data.nickname[0]}</Avatar>} title={data.nickname} />
      </Card>
    </div>
  );
};

export default UserInfo;
