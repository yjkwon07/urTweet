import styled from '@emotion/styled';
import Form from 'antd/lib/form/Form';

export const StyledForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
  box-sizing: border-box;

  & {
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
