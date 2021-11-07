import styled from '@emotion/styled';

export const StyledViewWrapper = styled.div`
  margin-top: 4px;
`;

export const StyledFilter = styled.div`
  & {
    .wrapper {
      width: 100%;
      .select {
        width: 120px;
      }
      .search-result {
        font-weight: 700;
      }
      .auto-search-box {
        width: 300px;
      }
      .search-input {
        padding-left: 15px;
        border-radius: 17px;
      }
    }
  }
`;
