import styled from '@emotion/styled';
import { Layout } from 'antd';

export const StyledLayout = styled(Layout)`
  background-color: #f0f2f5;
  min-height: 100vh;

  .header {
    height: 45px;
    background: #fff;
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    padding-left: 15px;
    & {
      .logo {
        font-size: 25px;
      }
      .title {
        color: #000 !important;
        font-weight: 500;
      }
    }
  }

  .header-menu {
    padding-left: 180px !important;
    @media screen and (max-width: 576px) {
      padding-left: 10px !important;
    }
    & {
      .content {
        position: sticky;
        top: 100px;
        & {
          .menu {
            background-color: #f0f2f5;
            & .menu-item {
              border-radius: 10px;
              font-size: 18px;
              font-weight: 400;
              & a {
                color: #78797d !important;
              }
            }
            & .ant-menu-item-selected {
              background-color: #fff;
              font-size: 20px;
              font-weight: 700;
              & a {
                color: black !important;
              }
            }
          }
        }
      }
    }
  }

  .view {
    padding-top: 4px;
  }

  .filter {
    & {
      .content {
        position: sticky;
        top: 100px;
      }
    }
  }

  .scroll-up {
    line-height: 40px;
    border-radius: 20px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }
`;
