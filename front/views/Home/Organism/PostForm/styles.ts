import styled from '@emotion/styled';
import { Form } from 'antd';

export const FormWrapper = styled(Form)`
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
`;
