import React, { VFC } from 'react';

import { StopOutlined } from '@ant-design/icons';
import { List, Button, Card } from 'antd';

export interface IProps {
  header: string;
  data: { nickname: string }[];
  onClickMore?: () => void;
  loading?: boolean;
}

const FollowList: VFC<IProps> = ({ header, data, onClickMore, loading }) => {
  return (
    <List
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
