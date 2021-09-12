function resListDataFormat(data) {
  return {
    resData: {
      list: data.list,
      curPage: data.curPage,
      nextPage: data.nextPage,
      rowsPerPage: data.rowsPerPage,
      totalCount: data.totalCount,
    },
  };
}

function resDataFormat(item) {
  return {
    resData: {
      item,
    },
  };
}

module.exports = { resListDataFormat, resDataFormat };
