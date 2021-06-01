webpackHotUpdate_N_E("pages/profile",{

/***/ "./utils/urls.ts":
/*!***********************!*\
  !*** ./utils/urls.ts ***!
  \***********************/
/*! exports provided: PASS_HREF, HOME_URL, POST_URL, PROFILE_URL, SIGNUP_URL, HASNTAG_URL, USER_URL, GET_HASHTAG_URL, GET_IMAGE_URL, GET_USER_URL, GET_POST_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PASS_HREF", function() { return PASS_HREF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOME_URL", function() { return HOME_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_URL", function() { return POST_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE_URL", function() { return PROFILE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGNUP_URL", function() { return SIGNUP_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HASNTAG_URL", function() { return HASNTAG_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_URL", function() { return USER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_HASHTAG_URL", function() { return GET_HASHTAG_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_IMAGE_URL", function() { return GET_IMAGE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_USER_URL", function() { return GET_USER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_POST_URL", function() { return GET_POST_URL; });
/* harmony import */ var _modules_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @modules/client */ "./modules/client/index.ts");

var PASS_HREF = 'PASS_HREF';
var HOME_URL = '/';
var POST_URL = '/post/[id]';
var PROFILE_URL = '/profile';
var SIGNUP_URL = '/signup';
var HASNTAG_URL = '/hashtag/:hashtag';
var USER_URL = '/user/[id]';
var GET_HASHTAG_URL = function GET_HASHTAG_URL(hashtag) {
  return HASNTAG_URL.replace(':hashtag', hashtag);
};
_c = GET_HASHTAG_URL;
var GET_IMAGE_URL = function GET_IMAGE_URL(name) {
  return "".concat(_modules_client__WEBPACK_IMPORTED_MODULE_0__["axiosSetting"].server(), "/").concat(name);
  return "".concat(_modules_client__WEBPACK_IMPORTED_MODULE_0__["axiosSetting"].server(), "/").concat(name);
};
_c2 = GET_IMAGE_URL;
var GET_USER_URL = function GET_USER_URL(id) {
  return USER_URL.replace('[id]', id);
};
_c3 = GET_USER_URL;
var GET_POST_URL = function GET_POST_URL(id) {
  return POST_URL.replace('[id]', id);
};
_c4 = GET_POST_URL;

var _c, _c2, _c3, _c4;

$RefreshReg$(_c, "GET_HASHTAG_URL");
$RefreshReg$(_c2, "GET_IMAGE_URL");
$RefreshReg$(_c3, "GET_USER_URL");
$RefreshReg$(_c4, "GET_POST_URL");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/next/dist/compiled/webpack/harmony-module.js */ "./node_modules/next/dist/compiled/webpack/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdXRpbHMvdXJscy50cyJdLCJuYW1lcyI6WyJQQVNTX0hSRUYiLCJIT01FX1VSTCIsIlBPU1RfVVJMIiwiUFJPRklMRV9VUkwiLCJTSUdOVVBfVVJMIiwiSEFTTlRBR19VUkwiLCJVU0VSX1VSTCIsIkdFVF9IQVNIVEFHX1VSTCIsImhhc2h0YWciLCJyZXBsYWNlIiwiR0VUX0lNQUdFX1VSTCIsIm5hbWUiLCJheGlvc1NldHRpbmciLCJzZXJ2ZXIiLCJHRVRfVVNFUl9VUkwiLCJpZCIsIkdFVF9QT1NUX1VSTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFTyxJQUFNQSxTQUFTLEdBQUcsV0FBbEI7QUFFQSxJQUFNQyxRQUFRLEdBQUcsR0FBakI7QUFDQSxJQUFNQyxRQUFRLEdBQUcsWUFBakI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsVUFBcEI7QUFDQSxJQUFNQyxVQUFVLEdBQUcsU0FBbkI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsbUJBQXBCO0FBQ0EsSUFBTUMsUUFBUSxHQUFHLFlBQWpCO0FBRUEsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxPQUFELEVBQXFCO0FBQ2xELFNBQU9ILFdBQVcsQ0FBQ0ksT0FBWixDQUFvQixVQUFwQixFQUFnQ0QsT0FBaEMsQ0FBUDtBQUNELENBRk07S0FBTUQsZTtBQUlOLElBQU1HLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsSUFBRCxFQUFrQjtBQUM3QyxtQkFBVUMsNERBQVksQ0FBQ0MsTUFBYixFQUFWLGNBQW1DRixJQUFuQztBQUNBLG1CQUFVQyw0REFBWSxDQUFDQyxNQUFiLEVBQVYsY0FBbUNGLElBQW5DO0FBQ0QsQ0FITTtNQUFNRCxhO0FBS04sSUFBTUksWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ0MsRUFBRCxFQUFnQjtBQUMxQyxTQUFPVCxRQUFRLENBQUNHLE9BQVQsQ0FBaUIsTUFBakIsRUFBeUJNLEVBQXpCLENBQVA7QUFDRCxDQUZNO01BQU1ELFk7QUFJTixJQUFNRSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDRCxFQUFELEVBQWdCO0FBQzFDLFNBQU9iLFFBQVEsQ0FBQ08sT0FBVCxDQUFpQixNQUFqQixFQUF5Qk0sRUFBekIsQ0FBUDtBQUNELENBRk07TUFBTUMsWSIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9wcm9maWxlLjBjNjE1OGI1NjQ1Mjg0N2E0NjJjLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBheGlvc1NldHRpbmcgfSBmcm9tICdAbW9kdWxlcy9jbGllbnQnO1xuXG5leHBvcnQgY29uc3QgUEFTU19IUkVGID0gJ1BBU1NfSFJFRic7XG5cbmV4cG9ydCBjb25zdCBIT01FX1VSTCA9ICcvJztcbmV4cG9ydCBjb25zdCBQT1NUX1VSTCA9ICcvcG9zdC9baWRdJztcbmV4cG9ydCBjb25zdCBQUk9GSUxFX1VSTCA9ICcvcHJvZmlsZSc7XG5leHBvcnQgY29uc3QgU0lHTlVQX1VSTCA9ICcvc2lnbnVwJztcbmV4cG9ydCBjb25zdCBIQVNOVEFHX1VSTCA9ICcvaGFzaHRhZy86aGFzaHRhZyc7XG5leHBvcnQgY29uc3QgVVNFUl9VUkwgPSAnL3VzZXIvW2lkXSc7XG5cbmV4cG9ydCBjb25zdCBHRVRfSEFTSFRBR19VUkwgPSAoaGFzaHRhZzogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBIQVNOVEFHX1VSTC5yZXBsYWNlKCc6aGFzaHRhZycsIGhhc2h0YWcpO1xufTtcblxuZXhwb3J0IGNvbnN0IEdFVF9JTUFHRV9VUkwgPSAobmFtZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBgJHtheGlvc1NldHRpbmcuc2VydmVyKCl9LyR7bmFtZX1gO1xuICByZXR1cm4gYCR7YXhpb3NTZXR0aW5nLnNlcnZlcigpfS8ke25hbWV9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBHRVRfVVNFUl9VUkwgPSAoaWQ6IHN0cmluZykgPT4ge1xuICByZXR1cm4gVVNFUl9VUkwucmVwbGFjZSgnW2lkXScsIGlkKTtcbn07XG5cbmV4cG9ydCBjb25zdCBHRVRfUE9TVF9VUkwgPSAoaWQ6IHN0cmluZykgPT4ge1xuICByZXR1cm4gUE9TVF9VUkwucmVwbGFjZSgnW2lkXScsIGlkKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9