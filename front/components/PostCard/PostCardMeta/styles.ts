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

export const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  & span.time-text {
    color: #ccc;
    margin-left: 10px;
    font-size: 14px;
  }
`;
