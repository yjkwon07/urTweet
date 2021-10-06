import styled from '@emotion/styled';
import { Button, Card } from 'antd';

export const StyledCard = styled(Card)`
  & {
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledButton = styled(Button)`
  min-width: 122px;
  height: 36px;
  font-size: 15px;
  font-weight: bold;
`;

export const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  & .nickname {
    margin-right: 10px;
  }
`;
