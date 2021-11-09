import { FC } from 'react';

import { Layout } from 'antd';

import { content, info, StyledLayout } from './styles';

const { Content } = Layout;

const CenterInfoLayout: FC = ({ children }) => {
  return (
    <StyledLayout>
      <Content css={content}>
        <div css={info}>{children}</div>
      </Content>
    </StyledLayout>
  );
};

export default CenterInfoLayout;
