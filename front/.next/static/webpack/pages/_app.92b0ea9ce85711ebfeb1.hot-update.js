webpackHotUpdate_N_E("pages/_app",{

/***/ "./modules/client/index.ts":
/*!*********************************!*\
  !*** ./modules/client/index.ts ***!
  \*********************************/
/*! exports provided: axiosSetting, axios */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axiosSetting", function() { return axiosSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axios", function() { return axios; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/**
 * 	* Basic
 * 	* Security scheme type:	HTTP
 * 	* HTTP Authorization Scheme	basic
 */

var axiosSetting = {
  scheme: 'http',
  host: 'ur',
  api: '',
  port: '3065',
  server: function server() {
    return "".concat(this.scheme, "://").concat(this.host).concat(this.api).concat(this.port ? ":".concat(this.port) : '');
  }
};
var axios = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: axiosSetting.server(),
  withCredentials: true
});

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbW9kdWxlcy9jbGllbnQvaW5kZXgudHMiXSwibmFtZXMiOlsiYXhpb3NTZXR0aW5nIiwic2NoZW1lIiwiaG9zdCIsImFwaSIsInBvcnQiLCJzZXJ2ZXIiLCJheGlvcyIsIkF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsIndpdGhDcmVkZW50aWFscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU8sSUFBTUEsWUFBWSxHQUFHO0FBQzFCQyxRQUFNLEVBQUUsTUFEa0I7QUFFMUJDLE1BQUksRUFBRSxJQUZvQjtBQUcxQkMsS0FBRyxFQUFFLEVBSHFCO0FBSTFCQyxNQUFJLEVBQUUsTUFKb0I7QUFLMUJDLFFBTDBCLG9CQUtqQjtBQUNQLHFCQUFVLEtBQUtKLE1BQWYsZ0JBQTJCLEtBQUtDLElBQWhDLFNBQXVDLEtBQUtDLEdBQTVDLFNBQWtELEtBQUtDLElBQUwsY0FBZ0IsS0FBS0EsSUFBckIsSUFBOEIsRUFBaEY7QUFDRDtBQVB5QixDQUFyQjtBQVVBLElBQU1FLEtBQUssR0FBR0MsNENBQUssQ0FBQ0MsTUFBTixDQUFhO0FBQ2hDQyxTQUFPLEVBQUVULFlBQVksQ0FBQ0ssTUFBYixFQUR1QjtBQUVoQ0ssaUJBQWUsRUFBRTtBQUZlLENBQWIsQ0FBZCIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9fYXBwLjkyYjBlYTljZTg1NzExZWJmZWIxLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXhpb3MgZnJvbSAnYXhpb3MnO1xuXG4vKipcbiAqIFx0KiBCYXNpY1xuICogXHQqIFNlY3VyaXR5IHNjaGVtZSB0eXBlOlx0SFRUUFxuICogXHQqIEhUVFAgQXV0aG9yaXphdGlvbiBTY2hlbWVcdGJhc2ljXG4gKi9cblxuZXhwb3J0IGNvbnN0IGF4aW9zU2V0dGluZyA9IHtcbiAgc2NoZW1lOiAnaHR0cCcsXG4gIGhvc3Q6ICd1cicsXG4gIGFwaTogJycsXG4gIHBvcnQ6ICczMDY1JyxcbiAgc2VydmVyKCkge1xuICAgIHJldHVybiBgJHt0aGlzLnNjaGVtZX06Ly8ke3RoaXMuaG9zdH0ke3RoaXMuYXBpfSR7dGhpcy5wb3J0ID8gYDoke3RoaXMucG9ydH1gIDogJyd9YDtcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBheGlvcyA9IEF4aW9zLmNyZWF0ZSh7XG4gIGJhc2VVUkw6IGF4aW9zU2V0dGluZy5zZXJ2ZXIoKSxcbiAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9