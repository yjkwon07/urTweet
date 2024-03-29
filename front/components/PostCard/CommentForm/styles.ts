import styled from '@emotion/styled';
import { Form } from 'antd';

export const StyledForm = styled(Form)`
  & {
    .ant-form-item {
      margin-bottom: 0px;
      & textarea {
        border-radius: 12px;
        background-color: #f0f2f5;
        padding: 10px;
      }
    }
    .ant-form-item-with-help {
      margin-bottom: inherit;
    }
    .btn-group {
      text-align: right;
      & .submit-button {
        font-weight: bold;
      }
    }
  }
`;
