import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Row } from 'antd';

export const StyledRow = styled(Row)`
  display: flex;
  align-content: center;
  justify-content: center;

  text-align: center;
`;

export const content = css`
  border: unset;
  background-color: unset;
`;

export const title = css`
  font-weight: bold;
  font-size: xx-large;
`;

export const info = css`
  font-weight: bold;
`;

export const homeButton = css`
  border-radius: 6px;
`;
