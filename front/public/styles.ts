import { css } from '@emotion/react';

export const globalStyles = css`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .ant-col:nth-of-type(1) {
    margin-left: 0 !important;
  }
  .ant-col:last-child {
    margin-right: 0 !important;
  }
  .ant-form-item-explain-error {
    font-size: 11px;
  }

  .ant-modal-content {
    border-radius: 26px;
  }

  .ant-tooltip {
    font-size: 10px;
  }
  .ant-tooltip-inner {
    max-height: 25px;
    min-height: 25px;
    font-size: 10px;
  }

  .slick-slide {
    display: inline-block;
  }
  .ant-card-cover {
    transform: none !important;
  }
`;
