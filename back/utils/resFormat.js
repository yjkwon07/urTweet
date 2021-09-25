function resListDataFormat(resCode, resMsg, data) {
  return {
    resCode,
    resData: {
      list: data.list,
      curPage: data.curPage,
      nextPage: data.nextPage,
      rowsPerPage: data.rowsPerPage,
      totalCount: data.totalCount,
    },
    resMsg,
  };
}

function resItemDataFormat(resCode, resMsg, item) {
  return {
    resCode,
    resData: {
      item,
    },
    resMsg,
  };
}

function resDataFormat(resCode, resMsg, resData) {
  return {
    resCode,
    resData,
    resMsg,
  };
}

function resErrorDataFormat(resCode, resMsg) {
  return {
    resCode,
    resData: null,
    resMsg,
  };
}

module.exports = { resListDataFormat, resItemDataFormat, resDataFormat, resErrorDataFormat };
