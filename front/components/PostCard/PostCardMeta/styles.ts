import styled from '@emotion/styled';
import { Card } from 'antd';

export const StyledCardMeta = styled(Card.Meta)`
  & {
    .ant-card-meta-description {
      margin-top: 16px;
      margin-right: 50px;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  & > span {
    color: #ccc;
    margin-left: 10px;
    font-size: 14px;
  }
`;
