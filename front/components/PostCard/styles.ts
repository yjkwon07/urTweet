import styled from '@emotion/styled';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  &.collapse {
    border-bottom: 0px;
  }
  & {
    .ant-card-actions {
      border-top: 0px;
    }
    .ant-card-actions > li:not(:last-child) {
      border-right: 0px;
    }
  }
`;
