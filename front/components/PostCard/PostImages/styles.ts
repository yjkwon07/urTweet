import styled from '@emotion/styled';

export const StyledImage = styled.div`
  .more-view {
    position: relative;
  }
  & {
    .one-image {
      width: 100%;
      display: inline-block;
    }
    .two-image {
      width: 50%;
      display: inline-block;
    }
    .more-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 50%);
      border-radius: 0.5em;
      padding: 10;
      text-align: center;
      color: #fff;
      line-height: 30px;
    }
  }
`;
