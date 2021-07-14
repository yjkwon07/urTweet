import React, { useCallback } from 'react';

import { StopOutlined } from '@ant-design/icons';
import { List, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

import { removeFollowerMe, unFollow } from '@modules/user';
import { IUserInfo } from '@modules/user/@types/db';

export interface IProps {
  header: '팔로잉' | '팔로워';
  data?: IUserInfo[];
  onClickMore?: () => void;
  loading?: boolean;
  active?: boolean;
}

const FollowList = ({ header, data, onClickMore, loading = false, active = false }: IProps) => {
  const dispatch = useDispatch();

  const handleCancel = useCallback(
    (userId) => () => {
      if (header === '팔로잉') dispatch(unFollow.request({ userId }));
      else dispatch(removeFollowerMe.request({ userId }));
    },
    [dispatch, header],
  );

  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        active && (
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <Button onClick={onClickMore} loading={loading}>
              더 보기
            </Button>
          </div>
        )
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" onClick={handleCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
