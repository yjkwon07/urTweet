import styled from '@emotion/styled';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  &.collapse {
    border-bottom: 0px;
  }
  & {
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    .ant-card-actions {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .ant-card-actions > li:not(:last-child) {
      border-right: 0px;
    }
  }
`;

export const StyledRetweetCard = styled(Card)`
  border-radius: 20px;
`;
