import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Input } from 'antd';

export const globalStyles = css`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .ant-col:first-child {
    margin-left: 0 !important;
  }
  .ant-col:last-child {
    margin-right: 0 !important;
  }
  .ant-form-item-explain-error {
    font-size: 11px;
  }
`;

export const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
