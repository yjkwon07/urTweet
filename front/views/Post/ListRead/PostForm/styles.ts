import styled from '@emotion/styled';
import { Card, Form } from 'antd';

export const StyledCard = styled(Card)`
  & {
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledForm = styled(Form)`
  margin-bottom: 20;

  .content {
    display: flex;

    .avatar {
      margin-right: 10px;
    }

    .form {
      width: 100%;
      margin-bottom: 0;
    }
  }

  .actions {
    position: relative;
    margin-top: 20px;
    margin-bottom: 30px;

    .file {
      position: absolute;
      right: 80px;
      bottom: -15px;
    }

    .submit {
      position: absolute;
      right: 0;
      bottom: -15px;
      font-weight: bold;
    }
  }

  .image_preview {
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

  & {
    .ant-form-item {
      margin-bottom: 0px;
      & textarea {
        border-radius: 12px;
        background-color: #f9f9f9;
        padding: 10px;
      }
    }
  }
`;
