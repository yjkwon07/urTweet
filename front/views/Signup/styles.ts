import styled from '@emotion/styled';
import { Form } from 'antd';

export const StyledForm = styled(Form)`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  & {
    .title {
      font-weight: bold;
    }

    .ant-form-item {
      margin-bottom: 20px;
    }

    .ant-form-item-with-help {
      margin-bottom: 20px;
    }

    .btn-group {
      display: flex;
      justify-content: right;
      & {
        .submit-button {
          border-radius: 12px;
          font-weight: bold;
        }
      }
    }
  }
`;
