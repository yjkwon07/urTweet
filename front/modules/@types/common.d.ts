declare type ErrorCommonRes = {
  resMsg: string;
};

declare type CommonRes = {
  resCode: string;
  resMsg: string;
};

declare type ListReadCommonRes = {
  curPage: number;
  nextPage: number;
  rowsPerPage: number;
  totalCount: number;
};
