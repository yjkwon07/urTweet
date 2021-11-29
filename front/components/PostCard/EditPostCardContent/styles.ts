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

    .image_preview {
      margin-top: 10px !important;
      margin: auto;
      text-align: center;
      width: 400px;

      .wrapper {
        display: inline-block;
        margin: 0 15px 15px 0;

        .button_wrapper {
          margin-top: 5px;
          text-align: center;
        }
      }
    }

    .btn-group {
      display: flex;
      justify-content: right;
      & {
        .submit-button {
          border-radius: 12px;
          font-weight: bold;
        }
        .cancel-button {
          border-radius: 12px;
        }
      }
    }
  }
`;
