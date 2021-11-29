import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Layout } from 'antd';

import bgImg from 'public/assets/img/bg-layout.jpg';

export const StyledLayout = styled(Layout)`
  background: url(${bgImg}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;
`;

export const content = css`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
`;

export const info = css`
  width: 100% !important;
`;
