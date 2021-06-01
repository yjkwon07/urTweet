module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+wlD":
/***/ (function(module, exports) {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cha2");


/***/ }),

/***/ "1fKG":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "D/B9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createRequestAction; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("+wlD");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createRequestAsyncThunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("H2Ef");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const createRequestAction = (type, requestAPI) => {
  const REQUEST = `${type}/request`;
  const SUCCESS = `${type}/success`;
  const FAILURE = `${type}/fail`;
  const action = {
    TYPE: type,
    requestAPI,
    requset: Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createAction"])(REQUEST, (payload, meta) => ({
      payload,
      meta
    })),
    success: Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createAction"])(SUCCESS, (payload, meta) => ({
      payload,
      meta
    })),
    failure: Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createAction"])(FAILURE, (payload, meta) => ({
      payload,
      meta
    }))
  };
  const asyncTunk = Object(_createRequestAsyncThunk__WEBPACK_IMPORTED_MODULE_1__[/* createRequestAsyncThunk */ "a"])(action.requset);
  return _objectSpread(_objectSpread({}, action), {}, {
    asyncTunk
  });
};

/***/ }),

/***/ "EHGq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const postSelector = {
  list: state => state.POST.list,
  infinitePost: state => state.POST.infinitePost,
  infiniteUserPost: state => state.POST.infiniteUserPost,
  infiniteHashTagPost: state => state.POST.infiniteHashTagPost,
  data: state => state.POST.data
};
/* harmony default export */ __webpack_exports__["a"] = (postSelector);

/***/ }),

/***/ "Ecan":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ USER; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ login; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ logout; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* binding */ signup; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* binding */ readMyUser; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* binding */ readUser; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* binding */ modifyNickname; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ listReadFollow; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ listReadFollowing; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ follow; });
__webpack_require__.d(__webpack_exports__, "n", function() { return /* binding */ unFollow; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* binding */ removeFollowerMe; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ addPostToMe; });
__webpack_require__.d(__webpack_exports__, "l", function() { return /* binding */ removePostToMe; });
__webpack_require__.d(__webpack_exports__, "o", function() { return /* binding */ userReducer; });

// UNUSED EXPORTS: userAction

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__("+wlD");

// EXTERNAL MODULE: external "lodash/remove"
var remove_ = __webpack_require__("qLGd");
var remove_default = /*#__PURE__*/__webpack_require__.n(remove_);

// EXTERNAL MODULE: ./modules/helper/createRequestAction.ts
var createRequestAction = __webpack_require__("D/B9");

// EXTERNAL MODULE: ./modules/client/index.ts
var client = __webpack_require__("IMU7");

// CONCATENATED MODULE: ./modules/user/api/requestAPI.ts


/**
 * * 로그인 유저 정보 조회 GET
 * * url: /user
 * * body: {}
 * * res: IMyUser
 */
const GET_READ_MY_USER_API = () => {
  return `/user`;
};
const requestReadMyUser = () => {
  return client["a" /* axios */].get(GET_READ_MY_USER_API());
};
/**
 * * 유저 정보 조회 GET
 * * url: /user/:userId
 * * body: {}
 * * res: IUser
 */

const GET_READ_USER_API = url => {
  return `/user/${url.userId}`;
};
const requestReadUser = url => {
  return client["a" /* axios */].get(GET_READ_USER_API(url));
};
/**
 * * 로그인 POST
 * * url: /user/login
 * * body: ILoginBody
 * * res: IMyUser
 */

const GET_LOGIN_API = () => {
  return `/user/login`;
};
const requestLogin = body => {
  return client["a" /* axios */].post(GET_LOGIN_API(), body);
};
/**
 * * 로그아웃 POST
 * * url: /user/logout
 * * body: {}
 * * res: 'ok'
 */

const GET_LOGOUT_API = () => {
  return `/user/logout`;
};
const requestLogout = () => {
  return client["a" /* axios */].post(GET_LOGOUT_API());
};
/**
 * * 유저 등록 POST
 * * url: /user
 * * body: ISignupBody
 * * res: ISignupRes
 */

const GET_SIGNUP_API = () => {
  return `/user`;
};
const requestSignup = body => {
  return client["a" /* axios */].post(GET_SIGNUP_API(), body);
};
/**
 * * 닉네임 수정 PATCH
 * * url: /user/nickname
 * * body: IModifyNickNameBody
 * * res: IModifyNickNameRes
 */

const GET_MODIFY_NICKNAME_API = () => {
  return `/user/nickname`;
};
const requestModifyNickname = body => {
  return client["a" /* axios */].patch(GET_MODIFY_NICKNAME_API(), body);
};
/**
 * * 내가 팔로우 하는 유저 목록 조회 GET
 * * url: /user/followings?pageSize=number
 * * body: {}
 * * res: IUser[]
 */

const GET_LIST_READ_FOLLOWING_API = url => {
  return `/user/followings?pageSize=${url.pageSize || 0}`;
};
const requestListReadFollowing = url => {
  return client["a" /* axios */].get(GET_LIST_READ_FOLLOWING_API(url));
};
/**
 * * 나를 팔로워 하는 유저 목록 조회 GET
 * * url: /user/followers?pageSize=number
 * * body: {}
 * * res: IUser[]
 */

const GET_LIST_READ_FOLLOW_API = url => {
  return `/user/followers?pageSize=${url.pageSize || 0}`;
};
const requestListReadFollow = url => {
  return client["a" /* axios */].get(GET_LIST_READ_FOLLOW_API(url));
};
/**
 * * 유저 팔로우 PATCH
 * * url: /user/:userId/follow
 * * body: {}
 * * res: IFollowRes
 */

const GET_FOLLOW_API = url => {
  return `/user/${url.userId}/follow`;
};
const requestFollow = url => {
  return client["a" /* axios */].patch(GET_FOLLOW_API(url));
};
/**
 * * 유저 팔로우 삭제 DELETE
 * * url: /user/:userId/follow
 * * body: {}
 * * res: IUnFollowRes
 */

const GET_UNFOLLOW_API = url => {
  return `/user/${url.userId}/follow`;
};
const requestUnfollow = url => {
  return client["a" /* axios */].delete(GET_UNFOLLOW_API(url));
};
/**
 * * 나를 팔로워 하는 유저 삭제 DELETE
 * * url: /user/follower/:userId
 * * body: {}
 * * res: IRemoveFollowerMeRes
 */

const GET_REMOVE_FOLLOWER_ME_API = url => {
  return `/user/follower/${url.userId}`;
};
const requestRemoveFollowerMe = url => {
  return client["a" /* axios */].delete(GET_REMOVE_FOLLOWER_ME_API(url));
};
// CONCATENATED MODULE: ./modules/user/slice.ts




const USER = 'USER'; // Action - API

const login = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/login`, requestLogin);
const logout = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/logout`, requestLogout);
const signup = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/signup`, requestSignup);
const readMyUser = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/readMyUser`, requestReadMyUser);
const readUser = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/readUser`, requestReadUser);
const modifyNickname = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/modifyNickname`, requestModifyNickname);
const listReadFollow = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/listReadFollow`, requestListReadFollow);
const listReadFollowing = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/listReadFollowing`, requestListReadFollowing);
const follow = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/follow`, requestFollow);
const unFollow = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/unFollow`, requestUnfollow);
const removeFollowerMe = Object(createRequestAction["a" /* createRequestAction */])(`${USER}/removeFollowerMe`, requestRemoveFollowerMe); // Action

const addPostToMe = Object(toolkit_["createAction"])(`${USER}/addPostToMe`);
const removePostToMe = Object(toolkit_["createAction"])(`${USER}/removePostToMe`); // Type

// Reducer
const initialState = {
  MyInfo: null,
  user: null,
  followerListData: [],
  followingListData: []
};
const slice = Object(toolkit_["createSlice"])({
  name: USER,
  initialState,
  reducers: {},
  extraReducers: builder => builder.addCase(readMyUser.success, (state, {
    payload: data
  }) => {
    state.MyInfo = data;
  }).addCase(readUser.success, (state, {
    payload: data
  }) => {
    state.user = data;
  }).addCase(modifyNickname.success, (state, {
    payload: data
  }) => {
    if (state.MyInfo) state.MyInfo.nickname = data.nickname;
  }).addCase(listReadFollow.success, (state, {
    payload: data
  }) => {
    state.followerListData = data;
  }).addCase(listReadFollowing.success, (state, {
    payload: data
  }) => {
    state.followingListData = data;
  }).addCase(follow.success, (state, {
    payload: data
  }) => {
    if (state.MyInfo) state.MyInfo.Followings.push({
      id: data.UserId
    });
  }).addCase(unFollow.success, (state, {
    payload: data
  }) => {
    if (state.MyInfo) state.MyInfo.Followings = state.MyInfo.Followings.filter(_ => _.id !== data.UserId);
  }).addCase(removeFollowerMe.success, (state, {
    payload: data
  }) => {
    if (state.MyInfo) state.MyInfo.Followers = state.MyInfo.Followers.filter(_ => _.id !== data.UserId);
  }).addCase(addPostToMe, (state, {
    payload: id
  }) => {
    if (state.MyInfo) state.MyInfo.Posts.unshift({
      id
    });
  }).addCase(removePostToMe, (state, {
    payload: id
  }) => {
    if (state.MyInfo) remove_default()(state.MyInfo.Posts, v => v.id === id);
  }).addCase(login.success, (state, {
    payload: data
  }) => {
    state.MyInfo = data;
  }).addCase(logout.success, state => {
    state.MyInfo = null;
  }).addDefaultCase(state => state)
});
const userReducer = slice.reducer;
const userAction = slice.actions;

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "H2Ef":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createRequestAsyncThunk; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createRequestAsyncThunk(action) {
  return (payload, meta) => dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(_objectSpread(_objectSpread({}, action(payload, meta)), {}, {
        resolve,
        reject
      }));
    });
  };
}

/***/ }),

/***/ "IMU7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return axiosSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return axios; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/**
 * 	* Basic
 * 	* Security scheme type:	HTTP
 * 	* HTTP Authorization Scheme	basic
 */

const axiosSetting = {
  scheme: 'http',
  host: 'localhost',
  api: '',
  port: '3065',

  server() {
    return `${this.scheme}://${this.host}${this.api}${this.port ? `:${this.port}` : ''}`;
  }

};
const axios = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: axiosSetting.server(),
  withCredentials: true
});

/***/ }),

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "RmXt":
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "RpaF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Select
const userSelector = {
  myData: state => state.USER.MyInfo,
  userData: state => state.USER.user,
  followListData: state => state.USER.followerListData,
  followingListData: state => state.USER.followingListData
};
/* harmony default export */ __webpack_exports__["a"] = (userSelector);

/***/ }),

/***/ "Szyw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "n", function() { return /* reexport */ useMyUser; });
__webpack_require__.d(__webpack_exports__, "p", function() { return /* reexport */ selector["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ slice["a" /* USER */]; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* reexport */ slice["f" /* login */]; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* reexport */ slice["g" /* logout */]; });
__webpack_require__.d(__webpack_exports__, "l", function() { return /* reexport */ slice["m" /* signup */]; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* reexport */ slice["j" /* readUser */]; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* reexport */ slice["h" /* modifyNickname */]; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ slice["d" /* listReadFollow */]; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ slice["e" /* listReadFollowing */]; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ slice["c" /* follow */]; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* reexport */ slice["n" /* unFollow */]; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* reexport */ slice["k" /* removeFollowerMe */]; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ slice["b" /* addPostToMe */]; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* reexport */ slice["l" /* removePostToMe */]; });
__webpack_require__.d(__webpack_exports__, "o", function() { return /* reexport */ slice["o" /* userReducer */]; });

// UNUSED EXPORTS: readMyUser, userAction

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./modules/fetchStatus/index.ts + 2 modules
var fetchStatus = __webpack_require__("o0LO");

// EXTERNAL MODULE: ./modules/store/slices.ts
var slices = __webpack_require__("eEiR");

// EXTERNAL MODULE: ./modules/user/selector.ts
var selector = __webpack_require__("RpaF");

// EXTERNAL MODULE: ./modules/user/slice.ts + 1 modules
var slice = __webpack_require__("Ecan");

// CONCATENATED MODULE: ./modules/user/hooks/useMyUser.ts






function useMyUser({
  isInitFetch = true
}) {
  const dispatch = Object(external_react_redux_["useDispatch"])();
  const {
    status
  } = Object(fetchStatus["f" /* useFetchStatus */])(slice["i" /* readMyUser */].TYPE);
  const data = Object(slices["b" /* useAppSelector */])(selector["a" /* default */].myData);
  Object(external_react_["useEffect"])(() => {
    if (isInitFetch && status === undefined) dispatch(slice["i" /* readMyUser */].requset({}));
  }, [dispatch, isInitFetch, status]);
  return {
    status,
    data
  };
}
// CONCATENATED MODULE: ./modules/user/index.ts
/* eslint-disable import/no-cycle */




/***/ }),

/***/ "TpwP":
/***/ (function(module, exports) {



/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "bQCO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("EHGq");
/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("hPCA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "g", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "i", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "j", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["k"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "k", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "l", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["m"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "m", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "n", function() { return _slice__WEBPACK_IMPORTED_MODULE_1__["o"]; });

// eslint-disable-next-line import/no-cycle



/***/ }),

/***/ "boVf":
/***/ (function(module, exports) {

module.exports = require("dayjs");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cha2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("boVf");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("jYNn");
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("xnum");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_store_configStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("h127");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("TpwP");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_6__);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







dayjs__WEBPACK_IMPORTED_MODULE_2___default.a.locale('ko');
dayjs__WEBPACK_IMPORTED_MODULE_2___default.a.extend(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_3___default.a);

const App = ({
  Component,
  pageProps
}) => {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(next_head__WEBPACK_IMPORTED_MODULE_4___default.a, {
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
        charSet: "utf-8"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
        name: "viewport",
        content: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
        httpEquiv: "X-UA-Compatible",
        content: "ie=edge"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("title", {
        children: "urTweet"
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Component, _objectSpread({}, pageProps))]
  });
};

/* harmony default export */ __webpack_exports__["default"] = (_modules_store_configStore__WEBPACK_IMPORTED_MODULE_5__[/* wrapper */ "a"].withRedux(App));

/***/ }),

/***/ "eEiR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return useAppSelector; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("+wlD");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("JMOJ");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fetchStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("o0LO");
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("bQCO");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Szyw");







const rootReducer = (state, action) => {
  switch (action.type) {
    case next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__["HYDRATE"]:
      return action.payload;

    default:
      {
        return Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
          [_fetchStatus__WEBPACK_IMPORTED_MODULE_3__[/* FETCH_STATUS */ "a"]]: _fetchStatus__WEBPACK_IMPORTED_MODULE_3__[/* fetchStatusReducer */ "c"],
          [_user__WEBPACK_IMPORTED_MODULE_5__[/* USER */ "a"]]: _user__WEBPACK_IMPORTED_MODULE_5__[/* userReducer */ "o"],
          [_post__WEBPACK_IMPORTED_MODULE_4__[/* POST */ "a"]]: _post__WEBPACK_IMPORTED_MODULE_4__[/* postReducer */ "i"]
        })(state, action);
      }
  }
};

const useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"];
/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ "h127":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ wrapper; });

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__("+wlD");

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");

// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__("1fKG");
var external_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_redux_saga_);

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: external "redux-saga/effects"
var effects_ = __webpack_require__("RmXt");

// EXTERNAL MODULE: ./modules/helper/createRequestAction.ts
var createRequestAction = __webpack_require__("D/B9");

// EXTERNAL MODULE: ./modules/helper/createRequestAsyncThunk.ts
var createRequestAsyncThunk = __webpack_require__("H2Ef");

// EXTERNAL MODULE: ./modules/fetchStatus/index.ts + 2 modules
var fetchStatus = __webpack_require__("o0LO");

// CONCATENATED MODULE: ./modules/helper/createRequsetSaga.ts


const createRequestSaga = (asyncActionCreator, requestCall) => {
  return function* (action) {
    try {
      yield Object(effects_["put"])(Object(fetchStatus["d" /* request */])({
        type: asyncActionCreator.TYPE
      }));
      const {
        data
      } = yield Object(effects_["call"])(requestCall, action.payload);
      yield Object(effects_["put"])(asyncActionCreator.success(data, action.meta));
      yield Object(effects_["put"])(Object(fetchStatus["e" /* success */])({
        type: asyncActionCreator.TYPE,
        data
      }));

      if (action.resolve) {
        yield Object(effects_["call"])(action.resolve, data);
      }
    } catch (error) {
      var _error$response;

      if (!((_error$response = error.response) !== null && _error$response !== void 0 && _error$response.data)) error.response = {
        data: '네트워크 오류'
      };
      yield Object(effects_["put"])(asyncActionCreator.failure(error, action.meta));
      yield Object(effects_["put"])(Object(fetchStatus["b" /* fail */])({
        type: asyncActionCreator.TYPE,
        data: error
      }));

      if (action.reject) {
        yield Object(effects_["call"])(action.reject, error);
      }
    }
  };
};
// CONCATENATED MODULE: ./modules/helper/index.ts



// EXTERNAL MODULE: ./modules/user/index.ts + 1 modules
var user = __webpack_require__("Szyw");

// EXTERNAL MODULE: ./modules/post/slice.ts + 1 modules
var slice = __webpack_require__("hPCA");

// CONCATENATED MODULE: ./modules/post/saga.ts




const uploadImagesSaga = createRequestSaga(slice["o" /* uploadImages */], slice["o" /* uploadImages */].requestAPI);
const likePostSaga = createRequestSaga(slice["e" /* likePost */], slice["e" /* likePost */].requestAPI);
const unlikePostSaga = createRequestSaga(slice["n" /* unlikePost */], slice["n" /* unlikePost */].requestAPI);
const readPostSaga = createRequestSaga(slice["k" /* readPost */], slice["k" /* readPost */].requestAPI);
const listReadUserPostSaga = createRequestSaga(slice["h" /* listReadUserPost */], slice["h" /* listReadUserPost */].requestAPI);
const listReadHashTagPostSaga = createRequestSaga(slice["f" /* listReadHashTagPost */], slice["f" /* listReadHashTagPost */].requestAPI);
const listReadPostSaga = createRequestSaga(slice["g" /* listReadPost */], slice["g" /* listReadPost */].requestAPI);
const infiniteListReadPostSaga = createRequestSaga(slice["d" /* infinteListReadPost */], slice["d" /* infinteListReadPost */].requestAPI);
const createPostSaga = createRequestSaga(slice["c" /* createPost */], slice["c" /* createPost */].requestAPI);
const modifyPostSaga = createRequestSaga(slice["i" /* modifyPost */], slice["i" /* modifyPost */].requestAPI);
const removePostSaga = createRequestSaga(slice["l" /* removePost */], slice["l" /* removePost */].requestAPI);
const createCommentSaga = createRequestSaga(slice["b" /* createComment */], slice["b" /* createComment */].requestAPI);
const retweetPostSaga = createRequestSaga(slice["m" /* retweetPost */], slice["m" /* retweetPost */].requestAPI);

function* watchUploadImages() {
  yield Object(effects_["takeLatest"])(slice["o" /* uploadImages */].requset, uploadImagesSaga);
}

function* watchLikePost() {
  yield Object(effects_["takeLatest"])(slice["e" /* likePost */].requset, likePostSaga);
}

function* watchUnlikePost() {
  yield Object(effects_["takeLatest"])(slice["n" /* unlikePost */].requset, unlikePostSaga);
}

function* watchReadPost() {
  yield Object(effects_["takeLatest"])(slice["k" /* readPost */].requset, readPostSaga);
}

function* watchListReadUserPost() {
  yield Object(effects_["throttle"])(300, slice["h" /* listReadUserPost */].requset, listReadUserPostSaga);
}

function* watchListReadHashTag() {
  yield Object(effects_["takeLatest"])(slice["f" /* listReadHashTagPost */].requset, listReadHashTagPostSaga);
}

function* watchListRead() {
  yield Object(effects_["takeLatest"])(slice["g" /* listReadPost */].requset, listReadPostSaga);
}

function* watchInfiniteListRead() {
  yield Object(effects_["throttle"])(300, slice["d" /* infinteListReadPost */].requset, infiniteListReadPostSaga);
}

function* watchCreatePost() {
  yield Object(effects_["debounce"])(300, slice["c" /* createPost */].requset, function* (action) {
    yield Object(effects_["call"])(createPostSaga, action);
    const rootState = yield Object(effects_["select"])();
    const {
      status,
      data
    } = rootState.FETCH_STATUS[slice["c" /* createPost */].TYPE];

    if (status === 'SUCCESS') {
      yield Object(effects_["put"])(Object(user["b" /* addPostToMe */])(data.id));
    }
  });
}

function* watchModifyPost() {
  yield Object(effects_["takeLatest"])(slice["i" /* modifyPost */].requset, modifyPostSaga);
}

function* watchRemovePost() {
  yield Object(effects_["takeLatest"])(slice["l" /* removePost */].requset, function* (action) {
    yield Object(effects_["call"])(removePostSaga, action);
    const rootState = yield Object(effects_["select"])();
    const {
      status,
      data
    } = rootState.FETCH_STATUS[slice["l" /* removePost */].TYPE];

    if (status === 'SUCCESS') {
      yield Object(effects_["put"])(Object(user["k" /* removePostToMe */])(data.PostId));
    }
  });
}

function* watchCreateComment() {
  yield Object(effects_["debounce"])(300, slice["b" /* createComment */].requset, createCommentSaga);
}

function* watchRetweetPost() {
  yield Object(effects_["debounce"])(300, slice["m" /* retweetPost */].requset, retweetPostSaga);
}

function* postSaga() {
  yield Object(effects_["all"])([Object(effects_["fork"])(watchUploadImages), Object(effects_["fork"])(watchLikePost), Object(effects_["fork"])(watchUnlikePost), Object(effects_["fork"])(watchReadPost), Object(effects_["fork"])(watchListReadUserPost), Object(effects_["fork"])(watchListReadHashTag), Object(effects_["fork"])(watchListRead), Object(effects_["fork"])(watchInfiniteListRead), Object(effects_["fork"])(watchCreatePost), Object(effects_["fork"])(watchModifyPost), Object(effects_["fork"])(watchRemovePost), Object(effects_["fork"])(watchCreateComment), Object(effects_["fork"])(watchRetweetPost)]);
}
// EXTERNAL MODULE: ./modules/user/slice.ts + 1 modules
var user_slice = __webpack_require__("Ecan");

// CONCATENATED MODULE: ./modules/user/saga.ts



const loginSaga = createRequestSaga(user_slice["f" /* login */], user_slice["f" /* login */].requestAPI);
const logoutSaga = createRequestSaga(user_slice["g" /* logout */], user_slice["g" /* logout */].requestAPI);
const signupSaga = createRequestSaga(user_slice["m" /* signup */], user_slice["m" /* signup */].requestAPI);
const readMyUserSaga = createRequestSaga(user_slice["i" /* readMyUser */], user_slice["i" /* readMyUser */].requestAPI);
const readUserSaga = createRequestSaga(user_slice["j" /* readUser */], user_slice["j" /* readUser */].requestAPI);
const modifyNicknameSaga = createRequestSaga(user_slice["h" /* modifyNickname */], user_slice["h" /* modifyNickname */].requestAPI);
const listReadfollowSaga = createRequestSaga(user_slice["d" /* listReadFollow */], user_slice["d" /* listReadFollow */].requestAPI);
const listReadfollowingSaga = createRequestSaga(user_slice["e" /* listReadFollowing */], user_slice["e" /* listReadFollowing */].requestAPI);
const followSaga = createRequestSaga(user_slice["c" /* follow */], user_slice["c" /* follow */].requestAPI);
const unFollowSaga = createRequestSaga(user_slice["n" /* unFollow */], user_slice["n" /* unFollow */].requestAPI);
const removeFollowerMeSaga = createRequestSaga(user_slice["k" /* removeFollowerMe */], user_slice["k" /* removeFollowerMe */].requestAPI);

function* watchLogIn() {
  yield Object(effects_["takeLatest"])(user_slice["f" /* login */].requset, loginSaga);
}

function* watchLogout() {
  yield Object(effects_["takeLatest"])(user_slice["g" /* logout */].requset, logoutSaga);
}

function* watchSinup() {
  yield Object(effects_["debounce"])(300, user_slice["m" /* signup */].requset, signupSaga);
}

function* watchReadMyUser() {
  yield Object(effects_["takeLatest"])(user_slice["i" /* readMyUser */].requset, readMyUserSaga);
}

function* watchReadUser() {
  yield Object(effects_["takeLatest"])(user_slice["j" /* readUser */].requset, readUserSaga);
}

function* watchModifyNickname() {
  yield Object(effects_["takeLatest"])(user_slice["h" /* modifyNickname */].requset, modifyNicknameSaga);
}

function* watchListReadFollow() {
  yield Object(effects_["takeLatest"])(user_slice["d" /* listReadFollow */].requset, listReadfollowSaga);
}

function* watchListReadFollowing() {
  yield Object(effects_["takeLatest"])(user_slice["e" /* listReadFollowing */].requset, listReadfollowingSaga);
}

function* watchFollow() {
  yield Object(effects_["takeLatest"])(user_slice["c" /* follow */].requset, followSaga);
}

function* watchUnFollow() {
  yield Object(effects_["takeLatest"])(user_slice["n" /* unFollow */].requset, unFollowSaga);
}

function* watchRemoveFollowerMe() {
  yield Object(effects_["takeLatest"])(user_slice["k" /* removeFollowerMe */].requset, removeFollowerMeSaga);
}

function* userSaga() {
  yield Object(effects_["all"])([Object(effects_["fork"])(watchLogIn), Object(effects_["fork"])(watchLogout), Object(effects_["fork"])(watchSinup), Object(effects_["fork"])(watchReadMyUser), Object(effects_["fork"])(watchReadUser), Object(effects_["fork"])(watchModifyNickname), Object(effects_["fork"])(watchListReadFollow), Object(effects_["fork"])(watchListReadFollowing), Object(effects_["fork"])(watchFollow), Object(effects_["fork"])(watchUnFollow), Object(effects_["fork"])(watchRemoveFollowerMe)]);
}
// CONCATENATED MODULE: ./modules/store/sagas.ts



function* rootSaga() {
  yield Object(effects_["all"])([Object(effects_["fork"])(userSaga), Object(effects_["fork"])(postSaga)]);
}
// EXTERNAL MODULE: ./modules/store/slices.ts
var slices = __webpack_require__("eEiR");

// CONCATENATED MODULE: ./modules/store/configStore.ts






const devMode = false; // Next.js를 사용하게 되면 유저가 요청할 때 마다 redux store를 새로 생성하게 되므로 redux store가 여러 개가 될 수 있다.
// etInitialProps, getServerSideProps 등에서 redux store에 접근할 수 있어야 하는데 그것을 next-redux-wrapper가 도와준다.

const makeStore = () => {
  const sagaMiddleware = external_redux_saga_default()();
  const store = Object(toolkit_["configureStore"])({
    reducer: slices["a" /* default */],
    middleware: [external_redux_thunk_default.a, sagaMiddleware],
    devTools: devMode
  }); // Next Redux Toolkit 에서 saga를 사용해야할 때

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = Object(external_next_redux_wrapper_["createWrapper"])(makeStore, {
  debug: devMode
});

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hPCA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ POST; });
__webpack_require__.d(__webpack_exports__, "o", function() { return /* binding */ uploadImages; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* binding */ listReadUserPost; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ infinteListReadPost; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ listReadHashTagPost; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ listReadPost; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* binding */ readPost; });
__webpack_require__.d(__webpack_exports__, "m", function() { return /* binding */ retweetPost; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ createPost; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* binding */ modifyPost; });
__webpack_require__.d(__webpack_exports__, "l", function() { return /* binding */ removePost; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ likePost; });
__webpack_require__.d(__webpack_exports__, "n", function() { return /* binding */ unlikePost; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ createComment; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* binding */ postReducer; });

// UNUSED EXPORTS: postAction

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__("+wlD");

// EXTERNAL MODULE: ./modules/helper/createRequestAction.ts
var createRequestAction = __webpack_require__("D/B9");

// EXTERNAL MODULE: ./modules/client/index.ts
var client = __webpack_require__("IMU7");

// CONCATENATED MODULE: ./modules/post/api/requestAPI.ts


/**
 * * post 게시글 정보 조회 GET
 * * url: /post/:postId
 * * body: {}
 * * res: IPost
 */
function GET_READ_POST_API(url) {
  return `/post/${url.postId}`;
}
const requestReadPost = url => {
  return client["a" /* axios */].get(GET_READ_POST_API(url));
};
/**
 * * post 게시글 리스트 정보 조회 GET
 * * url: /posts?lastId=:lasId&pageSize=:pageSize
 * * body: {}
 * * res: IPost[]
 */

function GET_LIST_READ_POST_API(url) {
  return `/posts?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}
const requestListReadPost = url => {
  return client["a" /* axios */].get(GET_LIST_READ_POST_API(url));
};
/**
 * * 해쉬태그로 게시글 검색 GET
 * * url: /hashtag/:hashtag?lastId=:lastId&pageSize=:pageSize
 * * body: {}
 * * res: IPost[]
 */

function GET_LIST_READ_HASHTAG_POST_API(url) {
  return `/hashtag/${encodeURIComponent(url.hashtag)}?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}
const requestListReadHashtagPost = url => {
  return client["a" /* axios */].get(GET_LIST_READ_HASHTAG_POST_API(url));
};
/**
 * * post 유저 게시글 리스트 정보 조회 GET
 * * url: /user/:userId/posts?lastId=:lastId&pageSize=:pageSize
 * * body: {}
 * * res: IPost[]
 */

function GET_LIST_READ_USER_POST_API(url) {
  return `/user/${url.userId}/posts?lastId=${url.lastId || 0}&pageSize=${url.pageSize}`;
}
const requestListReadUserPost = url => {
  return client["a" /* axios */].get(GET_LIST_READ_USER_POST_API(url));
};
/**
 * * 해당 게시글 리트윗 POST
 * * url: /post/:postId/retweet
 * * body: {}
 * * res: IPost
 */

function GET_CREATE_POST_RETWEET_API(url) {
  return `/post/${url.postId}/retweet`;
}
const requestCreatePostRetweet = url => {
  return client["a" /* axios */].post(GET_CREATE_POST_RETWEET_API(url));
};
/**
 * * 게시글 등록 POST
 * * url: /post
 * * body: IPostBody
 * * res: IPost
 */

function GET_CREATE_POST_API() {
  return `/post`;
}
const requestCreatePost = body => {
  return client["a" /* axios */].post(GET_CREATE_POST_API(), body);
};
/**
 * * 게시글 수정 PATCH
 * * url: /post/:postId
 * * body: IPostBody
 * * res: IModifyPostRes
 */

function GET_MODIFY_POST_API(url) {
  return `/post/${url.postId}`;
}
const requestModifyPost = ({
  url,
  body
}) => {
  return client["a" /* axios */].patch(GET_MODIFY_POST_API(url), body);
};
/**
 * * 게시글 삭제 DELETE
 * * url: /post/:postId
 * * body: {}
 * * res: IRemovePostRes
 */

function GET_REMOVE_POST_API(url) {
  return `/post/${url.postId}`;
}
const requestRemovePost = url => {
  return client["a" /* axios */].delete(GET_REMOVE_POST_API(url));
};
/**
 * * 해당 게시글 좋아요 PATCH
 * * url: /post/:postId/like
 * * body: {}
 * * res: ILikePostRes
 */

function GET_MODIFY_LIKE_POST_API(url) {
  return `/post/${url.postId}/like`;
}
const requestLikePost = url => {
  return client["a" /* axios */].patch(GET_MODIFY_LIKE_POST_API(url));
};
/**
 * * 해당 게시글 좋아요 취소 DELETE
 * * url: /post/:postId/like
 * * body: {}
 * * res: IUnlikePostRes
 */

function GET_REMOVE_LIKE_POST_API(url) {
  return `/post/${url.postId}/like`;
}
const requestUnlikePost = url => {
  return client["a" /* axios */].delete(GET_REMOVE_LIKE_POST_API(url));
};
/**
 * * 해당 게시글 댓글 등록 POST
 * * url: /post/:postId/comment
 * * body: ICommentBody
 * * res: IUnlikePostRes
 */

function GET_CREATE_COMMENT_API(url) {
  return `/post/${url.postId}/comment`;
}
const requestCreateComment = ({
  url,
  body
}) => {
  return client["a" /* axios */].post(GET_CREATE_COMMENT_API(url), body);
};
/**
 * * 해당 게시글 이미지 업로드 POST
 * * url: /post/images
 * * body: IUploadImageBody
 * * res: IUploadImagePathRes
 */

function GET_UPLOAD_POST_IMAGES_API() {
  return `/post/images`;
}
const requestUploadPostImages = body => {
  return client["a" /* axios */].post(GET_UPLOAD_POST_IMAGES_API(), body);
};
// CONCATENATED MODULE: ./modules/post/slice.ts



const POST = 'POST'; // Action - API

const uploadImages = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/uploadImages`, requestUploadPostImages);
const listReadUserPost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/listReadUserPost`, requestListReadUserPost);
const infinteListReadPost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}infinteListReadPost`, requestListReadPost);
const listReadHashTagPost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/listReadHashTagPost`, requestListReadHashtagPost);
const listReadPost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}listReadPost`, requestListReadPost);
const readPost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/readPost`, requestReadPost);
const retweetPost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/retweetPost`, requestCreatePostRetweet);
const createPost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/createPost`, requestCreatePost);
const modifyPost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/modifyPost`, requestModifyPost);
const removePost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/removePost`, requestRemovePost);
const likePost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/likePost`, requestLikePost);
const unlikePost = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/unlikePost`, requestUnlikePost);
const createComment = Object(createRequestAction["a" /* createRequestAction */])(`${POST}/createComment`, requestCreateComment); // Type

// Reducer
const initialState = {
  infinitePost: [],
  infiniteUserPost: [],
  infiniteHashTagPost: [],
  list: [],
  data: null
};
const slice = Object(toolkit_["createSlice"])({
  name: POST,
  initialState,
  reducers: {},
  extraReducers: builder => builder.addCase(readPost.success, (state, {
    payload: data
  }) => {
    state.data = data;
  }).addCase(listReadPost.success, (state, {
    payload: data
  }) => {
    state.list = data;
  }).addCase(infinteListReadPost.success, (state, {
    payload: data
  }) => {
    state.infinitePost.push(...data);
  }).addCase(listReadUserPost.success, (state, {
    payload: data
  }) => {
    state.infiniteUserPost.push(...data);
  }).addCase(listReadHashTagPost.success, (state, {
    payload: data
  }) => {
    state.infiniteHashTagPost.push(...data);
  }).addCase(retweetPost.success, (state, {
    payload: data
  }) => {
    state.infinitePost.unshift(data);
  }).addCase(createPost.success, (state, {
    payload: data
  }) => {
    state.infinitePost.unshift(data);
  }).addCase(modifyPost.success, (state, {
    payload: data
  }) => {
    const post = state.list.find(v => v.id === data.PostId);
    const infinitePost = state.infinitePost.find(v => v.id === data.PostId);
    const infiniteUserPost = state.infiniteUserPost.find(v => v.id === data.PostId);
    const infiniteHashTagPost = state.infiniteHashTagPost.find(v => v.id === data.PostId);
    if (post) post.content = data.content;
    if (infinitePost) infinitePost.content = data.content;
    if (infiniteUserPost) infiniteUserPost.content = data.content;
    if (infiniteHashTagPost) infiniteHashTagPost.content = data.content;
  }).addCase(removePost.success, (state, {
    payload: data
  }) => {
    state.list = state.list.filter(v => v.id !== data.PostId);
    state.infinitePost = state.infinitePost.filter(v => v.id !== data.PostId);
    state.infiniteUserPost = state.infiniteUserPost.filter(v => v.id !== data.PostId);
    state.infiniteHashTagPost = state.infiniteHashTagPost.filter(v => v.id !== data.PostId);
  }).addCase(likePost.success, (state, {
    payload: data
  }) => {
    var _state$list$find, _state$infinitePost$f, _state$infiniteUserPo, _state$infiniteHashTa;

    (_state$list$find = state.list.find(v => v.id === data.PostId)) === null || _state$list$find === void 0 ? void 0 : _state$list$find.Likers.push({
      id: data.UserId
    });
    (_state$infinitePost$f = state.infinitePost.find(v => v.id === data.PostId)) === null || _state$infinitePost$f === void 0 ? void 0 : _state$infinitePost$f.Likers.push({
      id: data.UserId
    });
    (_state$infiniteUserPo = state.infiniteUserPost.find(v => v.id === data.PostId)) === null || _state$infiniteUserPo === void 0 ? void 0 : _state$infiniteUserPo.Likers.push({
      id: data.UserId
    });
    (_state$infiniteHashTa = state.infiniteHashTagPost.find(v => v.id === data.PostId)) === null || _state$infiniteHashTa === void 0 ? void 0 : _state$infiniteHashTa.Likers.push({
      id: data.UserId
    });
  }).addCase(unlikePost.success, (state, {
    payload: data
  }) => {
    const post = state.list.find(v => v.id === data.PostId);
    const infinitePost = state.infinitePost.find(v => v.id === data.PostId);
    const infiniteUserPost = state.infiniteUserPost.find(v => v.id === data.PostId);
    const infiniteHashTagPost = state.infiniteHashTagPost.find(v => v.id === data.PostId);
    if (post) post.Likers = post.Likers.filter(v => v.id !== data.UserId);
    if (infinitePost) infinitePost.Likers = infinitePost === null || infinitePost === void 0 ? void 0 : infinitePost.Likers.filter(v => v.id !== data.UserId);
    if (infiniteUserPost) infiniteUserPost.Likers = infiniteUserPost === null || infiniteUserPost === void 0 ? void 0 : infiniteUserPost.Likers.filter(v => v.id !== data.UserId);

    if (infiniteHashTagPost) {
      infiniteHashTagPost.Likers = infiniteHashTagPost === null || infiniteHashTagPost === void 0 ? void 0 : infiniteHashTagPost.Likers.filter(v => v.id !== data.UserId);
    }
  }).addCase(createComment.success, (state, {
    payload: data
  }) => {
    var _state$list$find2, _state$infinitePost$f2, _state$infiniteUserPo2, _state$infiniteHashTa2;

    (_state$list$find2 = state.list.find(v => v.id === data.PostId)) === null || _state$list$find2 === void 0 ? void 0 : _state$list$find2.Comments.unshift(data);
    (_state$infinitePost$f2 = state.infinitePost.find(v => v.id === data.PostId)) === null || _state$infinitePost$f2 === void 0 ? void 0 : _state$infinitePost$f2.Comments.unshift(data);
    (_state$infiniteUserPo2 = state.infiniteUserPost.find(v => v.id === data.PostId)) === null || _state$infiniteUserPo2 === void 0 ? void 0 : _state$infiniteUserPo2.Comments.unshift(data);
    (_state$infiniteHashTa2 = state.infiniteHashTagPost.find(v => v.id === data.PostId)) === null || _state$infiniteHashTa2 === void 0 ? void 0 : _state$infiniteHashTa2.Comments.unshift(data);
  }).addDefaultCase(state => state)
});
const postReducer = slice.reducer;
const postAction = slice.actions;

/***/ }),

/***/ "jYNn":
/***/ (function(module, exports) {

module.exports = require("dayjs/plugin/relativeTime");

/***/ }),

/***/ "o0LO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "f", function() { return /* reexport */ useFetchStatus; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ FETCH_STATUS; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ request; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ success; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ fail; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ fetchStatusReducer; });

// UNUSED EXPORTS: initFetch, fetchStatusAction

// EXTERNAL MODULE: ./modules/store/slices.ts
var slices = __webpack_require__("eEiR");

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__("+wlD");

// CONCATENATED MODULE: ./modules/fetchStatus/slice.ts
 // Type

// Name
const FETCH_STATUS = 'FETCH_STATUS'; // Action

const initFetch = Object(toolkit_["createAction"])(`${FETCH_STATUS}/initFetch`);
const request = Object(toolkit_["createAction"])(`${FETCH_STATUS}/request`);
const success = Object(toolkit_["createAction"])(`${FETCH_STATUS}/success`);
const fail = Object(toolkit_["createAction"])(`${FETCH_STATUS}/fail`); // Reducer

const initialState = {};
const slice = Object(toolkit_["createSlice"])({
  name: FETCH_STATUS,
  initialState,
  reducers: {},
  extraReducers: builder => builder.addCase(initFetch, (state, {
    payload: {
      type
    }
  }) => {
    state[type] = {
      status: 'INIT',
      data: null
    };
  }).addCase(request, (state, {
    payload: {
      type
    }
  }) => {
    state[type] = {
      status: 'LOADING',
      data: null
    };
  }).addCase(success, (state, {
    payload: {
      type,
      data
    }
  }) => {
    state[type] = {
      status: 'SUCCESS',
      data
    };
  }).addCase(fail, (state, {
    payload: {
      type,
      data
    }
  }) => {
    state[type] = {
      status: 'FAIL',
      data
    };
  }).addDefaultCase(state => state)
});
const fetchStatusReducer = slice.reducer;
const fetchStatusAction = slice.actions;
// CONCATENATED MODULE: ./modules/fetchStatus/hooks/useFetchStatus.ts


function useFetchStatus(type) {
  const status = Object(slices["b" /* useAppSelector */])(state => {
    var _state$FETCH_STATUS$t;

    return (_state$FETCH_STATUS$t = state[FETCH_STATUS][type]) === null || _state$FETCH_STATUS$t === void 0 ? void 0 : _state$FETCH_STATUS$t.status;
  });
  const data = Object(slices["b" /* useAppSelector */])(state => {
    var _state$FETCH_STATUS$t2;

    return (_state$FETCH_STATUS$t2 = state[FETCH_STATUS][type]) === null || _state$FETCH_STATUS$t2 === void 0 ? void 0 : _state$FETCH_STATUS$t2.data;
  });
  return {
    status,
    data
  };
}
// CONCATENATED MODULE: ./modules/fetchStatus/index.ts
// eslint-disable-next-line import/no-cycle



/***/ }),

/***/ "qLGd":
/***/ (function(module, exports) {

module.exports = require("lodash/remove");

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });