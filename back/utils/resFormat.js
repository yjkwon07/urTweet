const { SUCCESS } = require('../constant');

function resListDataFormat(data) {
  return {
    resCode: SUCCESS,
    resData: {
      list: data.list,
      curPage: data.curPage,
      nextPage: data.nextPage,
      rowsPerPage: data.rowsPerPage,
      totalCount: data.totalCount,
    },
    resMsg: '',
  };
}

function resDataFormat(item) {
  return {
    resCode: SUCCESS,
    resData: {
      item,
    },
    resMsg: '',
  };
}

module.exports = { resListDataFormat, resDataFormat };
