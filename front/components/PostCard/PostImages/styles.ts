import styled from '@emotion/styled';

export const StyledImage = styled.div`
  position: relative;
  & {
    .one-image {
      width: 100%;
      height: 240px;
      display: inline-block;
      border-radius: 15px;
      object-fit: cover;
      border: 1px solid;
      border-color: rgb(207, 217, 222);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
    .two-image-l {
      width: 50%;
      height: 280px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      display: inline-block;
      border: 1px solid;
      border-color: rgb(207, 217, 222);
    }
    .two-image-r {
      width: 50%;
      height: 280px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      display: inline-block;
      border: 1px solid;
      border-color: rgb(207, 217, 222);
    }
    .four-image-l-t {
      width: 50%;
      height: 140px;
      border-top-left-radius: 15px;
      display: inline-block;
      border: 1px solid;
      border-color: rgb(207, 217, 222);
    }
    .four-image-l-d {
      width: 50%;
      height: 140px;
      border-bottom-left-radius: 15px;
      display: inline-block;
      border: 1px solid;
      border-color: rgb(207, 217, 222);
    }
    .four-image-r-t {
      width: 50%;
      height: 140px;
      border-top-right-radius: 15px;
      display: inline-block;
      border: 1px solid;
      border-color: rgb(207, 217, 222);
    }
    .four-image-r-d {
      width: 50%;
      height: 140px;
      border-bottom-right-radius: 15px;
      display: inline-block;
      border: 1px solid;
      border-color: rgb(207, 217, 222);
    }
    .detail-image {
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 50%);
      border-radius: 0.5em;
      padding: 10px;
      text-align: center;
      color: #fff;
      line-height: 30px;
    }
  }
`;
