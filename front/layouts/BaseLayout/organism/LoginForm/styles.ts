import styled from '@emotion/styled';
import { Form } from 'antd';

export const FormWrapper = styled(Form)`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  padding: 30px 40px 0 40px;
  box-sizing: border-box;

  & {
    .ant-form-item-with-help {
      margin-bottom: 24px;
    }
    .login-button {
      border: '1px solid #d9d9d9';
      height: 52px;
      margin-bottom: 10px;
      & > span {
        font-size: 17px;
        font-weight: 700;
      }
    }
  }
`;
