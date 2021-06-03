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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+wlD":
/***/ (function(module, exports) {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

/***/ "0G5g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "1fKG":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("23aj");


/***/ }),

/***/ "23aj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return /* binding */ getServerSideProps; });

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__("1fKG");

// EXTERNAL MODULE: ./components/SEO/index.tsx
var SEO = __webpack_require__("MaJT");

// EXTERNAL MODULE: ./layouts/App/index.tsx + 4 modules
var App = __webpack_require__("F25u");

// EXTERNAL MODULE: ./modules/post/index.ts
var post = __webpack_require__("bQCO");

// EXTERNAL MODULE: ./modules/post/utils/constants.ts
var constants = __webpack_require__("zlJt");

// EXTERNAL MODULE: ./modules/store/configStore.ts + 5 modules
var configStore = __webpack_require__("h127");

// EXTERNAL MODULE: ./utils/urls.ts
var urls = __webpack_require__("ryrK");

// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__("Exp3");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./components/PostCard/index.tsx + 7 modules
var PostCard = __webpack_require__("mtVR");

// EXTERNAL MODULE: ./modules/fetchStatus/index.ts + 2 modules
var fetchStatus = __webpack_require__("o0LO");

// EXTERNAL MODULE: ./modules/store/slices.ts
var slices = __webpack_require__("eEiR");

// EXTERNAL MODULE: ./modules/post/selector.ts
var selector = __webpack_require__("EHGq");

// EXTERNAL MODULE: ./modules/post/slice.ts + 1 modules
var slice = __webpack_require__("hPCA");

// CONCATENATED MODULE: ./modules/post/hooks/useInfinitePost.ts






function useInfinitePost({
  pageSize,
  isInitFetch = true
}) {
  const dispatch = Object(external_react_redux_["useDispatch"])();
  const {
    status
  } = Object(fetchStatus["f" /* useFetchStatus */])(slice["d" /* infinteListReadPost */].TYPE);
  const data = Object(slices["b" /* useAppSelector */])(selector["a" /* default */].infinitePost) || [];
  const hasMoreRead = Object(external_react_["useMemo"])(() => (data === null || data === void 0 ? void 0 : data.length) && data.length % pageSize === 0, [data === null || data === void 0 ? void 0 : data.length, pageSize]);
  Object(external_react_["useEffect"])(() => {
    if (isInitFetch && status === undefined) {
      dispatch(slice["d" /* infinteListReadPost */].requset({
        pageSize
      }));
    }
  }, [dispatch, isInitFetch, pageSize, status]);
  return {
    status,
    data,
    hasMoreRead
  };
}
// EXTERNAL MODULE: ./modules/user/index.ts + 1 modules
var user = __webpack_require__("Szyw");

// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__("nZwT");

// EXTERNAL MODULE: external "@hookform/resolvers/yup"
var yup_ = __webpack_require__("4FCN");

// EXTERNAL MODULE: external "react-hook-form"
var external_react_hook_form_ = __webpack_require__("BTiB");

// EXTERNAL MODULE: external "yup"
var external_yup_ = __webpack_require__("C8TP");

// CONCATENATED MODULE: ./views/Home/Organism/PostForm/index.tsx











const POST_SCHEMA = external_yup_["object"]({
  content: external_yup_["string"]().min(3, '게시글은 3자 이상 입력하여 주십시오.').required('게시글은 필수 입력 항목 입니다.')
});

const PostForm = () => {
  var _errors$content, _errors$content2;

  const dispatch = Object(external_react_redux_["useDispatch"])();
  const {
    control,
    handleSubmit: checkSubmit,
    errors,
    reset
  } = Object(external_react_hook_form_["useForm"])({
    mode: 'onBlur',
    resolver: Object(yup_["yupResolver"])(POST_SCHEMA),
    defaultValues: {
      content: ''
    }
  });
  const {
    0: imageListPath,
    1: setImageListPath
  } = Object(external_react_["useState"])([]);
  const imageInput = Object(external_react_["useRef"])(null);
  const handleSubmit = Object(external_react_["useMemo"])(() => {
    return checkSubmit(async formData => {
      reset();

      try {
        await dispatch(post["c" /* createPost */].asyncTunk({
          content: formData.content,
          image: imageListPath
        }));
        external_antd_["message"].success('게시글이 등록되었습니다.');
      } catch (error) {
        external_antd_["message"].error(JSON.stringify(error.response.data));
      } finally {
        setImageListPath([]);
      }
    });
  }, [checkSubmit, dispatch, imageListPath, reset]);
  const handleClickImageUpload = Object(external_react_["useCallback"])(() => {
    if (imageInput.current) imageInput.current.click();
  }, []);
  const handleChangeImage = Object(external_react_["useCallback"])(async e => {
    try {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, file => {
        imageFormData.append('image', file);
      });
      const listPath = await dispatch(post["n" /* uploadImages */].asyncTunk(imageFormData));
      setImageListPath(listPath);
    } catch (error) {
      external_antd_["message"].error(JSON.stringify(error.response.data));
    }
  }, [dispatch]);
  const handleRemoveImage = Object(external_react_["useCallback"])(filePath => () => {
    setImageListPath(data => data.filter(name => name !== filePath));
  }, []);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Form"], {
    style: {
      marginBottom: 45
    },
    encType: "multipart/form-data",
    onFinish: handleSubmit,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Form"].Item, {
      name: "content",
      validateStatus: errors.content ? 'error' : 'success',
      help: errors.content ? (_errors$content = errors.content) === null || _errors$content === void 0 ? void 0 : _errors$content.message : '',
      rules: [{
        message: errors === null || errors === void 0 ? void 0 : (_errors$content2 = errors.content) === null || _errors$content2 === void 0 ? void 0 : _errors$content2.message
      }],
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_hook_form_["Controller"], {
        control: control,
        as: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Input"].TextArea, {
          maxLength: 140,
          autoSize: {
            minRows: 3,
            maxRows: 5
          },
          defaultValue: ""
        }),
        name: "content",
        id: "content",
        placeholder: "\uAC8C\uC2DC\uAE00\uC744 \uC791\uC131\uD574 \uC8FC\uC138\uC694."
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      style: {
        position: 'relative',
        margin: 0
      },
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
        type: "file",
        name: "image",
        multiple: true,
        hidden: true,
        ref: imageInput,
        onChange: handleChangeImage
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"], {
        style: {
          position: 'absolute',
          right: 80,
          bottom: '-15px'
        },
        onClick: handleClickImageUpload,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["UploadOutlined"], {}), " Images Upload"]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Button"], {
        type: "primary",
        htmlType: "submit",
        style: {
          position: 'absolute',
          right: 0,
          bottom: '-15px'
        },
        children: "\uC62C\uB9AC\uAE30"
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Space"], {
      size: 8,
      children: imageListPath.map(filePath => /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        style: {
          margin: '5px 0 5px 0'
        },
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Image"], {
          width: 200,
          height: 200,
          src: Object(urls["b" /* GET_IMAGE_URL */])(filePath, true),
          alt: filePath
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          style: {
            marginTop: '5px'
          },
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Button"], {
            type: "dashed",
            onClick: handleRemoveImage(filePath),
            children: "\uC81C\uAC70"
          })
        })]
      }, filePath))
    })]
  });
};

/* harmony default export */ var Organism_PostForm = (PostForm);
// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__("UlNW");
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);

// CONCATENATED MODULE: ./views/Home/styles.ts

const StyledCenter = styled_default.a.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;
`;
// CONCATENATED MODULE: ./views/Home/index.tsx















const Home = ({
  isSSR
}) => {
  const dispatch = Object(external_react_redux_["useDispatch"])();
  const myData = Object(slices["b" /* useAppSelector */])(user["p" /* userSelector */].myData);
  const {
    0: pageSize
  } = Object(external_react_["useState"])(constants["a" /* DEAFULT_PAGE_SIZE */]);
  const {
    status,
    data: postListData,
    hasMoreRead
  } = useInfinitePost({
    isInitFetch: !isSSR,
    pageSize
  });
  Object(external_react_["useEffect"])(() => {
    function onScroll() {
      if (postListData && hasMoreRead && status !== 'LOADING') {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (hasMoreRead) {
            const lastId = postListData[postListData.length - 1].id;
            dispatch(post["d" /* infinteListReadPost */].requset({
              lastId,
              pageSize
            }));
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [status, postListData, hasMoreRead, dispatch, pageSize]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
    children: [myData && /*#__PURE__*/Object(jsx_runtime_["jsx"])(Organism_PostForm, {}), postListData.map(data => /*#__PURE__*/Object(jsx_runtime_["jsx"])(PostCard["a" /* default */], {
      data: data
    }, data.id)), status === 'LOADING' && /*#__PURE__*/Object(jsx_runtime_["jsx"])(StyledCenter, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Spin"], {})
    }), status === 'FAIL' && /*#__PURE__*/Object(jsx_runtime_["jsx"])(StyledCenter, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
        children: "\uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
      })
    })]
  });
};

/* harmony default export */ var views_Home = (Home);
// CONCATENATED MODULE: ./pages/index.tsx













const HomePage = ({
  title,
  seo
}) => {
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(App["a" /* default */], {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(head_default.a, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("title", {
        children: title
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(SEO["a" /* default */], {
        title: seo.title,
        url: seo.url,
        description: seo.description,
        name: seo.name,
        keywords: seo.keywords
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(views_Home, {
      isSSR: true
    })]
  });
}; // SSR
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering


const getServerSideProps = configStore["a" /* wrapper */].getServerSideProps(async ({
  store
}) => {
  await store.dispatch(post["d" /* infinteListReadPost */].asyncTunk({
    pageSize: constants["a" /* DEAFULT_PAGE_SIZE */]
  }));
  store.dispatch(external_redux_saga_["END"]);
  return {
    props: {
      title: `HOME | urTweet`,
      seo: {
        title: `urTweet Home`,
        url: urls["e" /* HOME_URL */],
        description: `urTweet Home page`,
        name: `urTweet Home`,
        keywords: `Home`
      }
    }
  };
});
/* harmony default export */ var pages = __webpack_exports__["default"] = (HomePage);

/***/ }),

/***/ "284h":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("cDf5");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "3WeD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;

function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      ;
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

function stringifyUrlQueryParam(param) {
  if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
    return String(param);
  } else {
    return '';
  }
}

function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}

function assign(target, ...searchParamsList) {
  searchParamsList.forEach(searchParams => {
    Array.from(searchParams.keys()).forEach(key => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}

/***/ }),

/***/ "3wub":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.normalizeLocalePath = normalizeLocalePath;

function normalizeLocalePath(pathname, locales) {
  let detectedLocale; // first item will be empty string from splitting at first char

  const pathnameParts = pathname.split('/');
  (locales || []).some(locale => {
    if (pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join('/') || '/';
      return true;
    }

    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}

/***/ }),

/***/ "4FCN":
/***/ (function(module, exports) {

module.exports = require("@hookform/resolvers/yup");

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "6D7l":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__("3WeD"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


const slashedProtocols = /https?|ftp|gopher|file/;

function formatUrl(urlObj) {
  let {
    auth,
    hostname
  } = urlObj;
  let protocol = urlObj.protocol || '';
  let pathname = urlObj.pathname || '';
  let hash = urlObj.hash || '';
  let query = urlObj.query || '';
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';

  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);

    if (urlObj.port) {
      host += ':' + urlObj.port;
    }
  }

  if (query && typeof query === 'object') {
    query = String(querystring.urlQueryToSearchParams(query));
  }

  let search = urlObj.search || query && `?${query}` || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash[0] !== '#') hash = '#' + hash;
  if (search && search[0] !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');
  return `${protocol}${host}${pathname}${search}${hash}`;
}

/***/ }),

/***/ "BTiB":
/***/ (function(module, exports) {

module.exports = require("react-hook-form");

/***/ }),

/***/ "C8TP":
/***/ (function(module, exports) {

module.exports = require("yup");

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

/***/ "Exp3":
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "F25u":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__("Kps4");

// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__("Exp3");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: ./modules/user/index.ts + 1 modules
var user = __webpack_require__("Szyw");

// EXTERNAL MODULE: ./utils/urls.ts
var urls = __webpack_require__("ryrK");

// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__("nZwT");

// EXTERNAL MODULE: external "@hookform/resolvers/yup"
var yup_ = __webpack_require__("4FCN");

// EXTERNAL MODULE: external "react-hook-form"
var external_react_hook_form_ = __webpack_require__("BTiB");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "yup"
var external_yup_ = __webpack_require__("C8TP");

// EXTERNAL MODULE: ./modules/fetchStatus/index.ts + 2 modules
var fetchStatus = __webpack_require__("o0LO");

// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__("UlNW");
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);

// CONCATENATED MODULE: ./layouts/App/organism/LoginForm/styles.ts


const FormWrapper = styled_default()(external_antd_["Form"])`
  border: 1px solid #d9d9d9;
  padding: 10px;
  box-sizing: border-box;
`;
// CONCATENATED MODULE: ./layouts/App/organism/LoginForm/index.tsx














const LOGIN_SCHEMA = external_yup_["object"]({
  email: external_yup_["string"]().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  password: external_yup_["string"]().required('비밀번호는 필수 입력입니다.')
});

const LoginForm = () => {
  var _errors$email, _errors$email2, _errors$password, _errors$password2;

  const dispatch = Object(external_react_redux_["useDispatch"])();
  const {
    status
  } = Object(fetchStatus["f" /* useFetchStatus */])(user["f" /* login */].TYPE);
  const {
    control,
    handleSubmit: checkSubmit,
    errors
  } = Object(external_react_hook_form_["useForm"])({
    mode: 'onBlur',
    resolver: Object(yup_["yupResolver"])(LOGIN_SCHEMA)
  });
  const handleSubmit = Object(external_react_["useMemo"])(() => {
    return checkSubmit(async formData => {
      try {
        await dispatch(user["f" /* login */].asyncTunk(formData));
      } catch (error) {
        external_antd_["message"].error(JSON.stringify(error.response.data));
      }
    });
  }, [checkSubmit, dispatch]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(FormWrapper, {
    onFinish: () => handleSubmit(),
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Form"].Item, {
      label: "\uC774\uBA54\uC77C",
      htmlFor: "user_email",
      validateStatus: errors.email ? 'error' : 'success',
      help: errors.email ? (_errors$email = errors.email) === null || _errors$email === void 0 ? void 0 : _errors$email.message : '',
      rules: [{
        message: (_errors$email2 = errors.email) === null || _errors$email2 === void 0 ? void 0 : _errors$email2.message
      }],
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_hook_form_["Controller"], {
        control: control,
        as: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Input"], {
          prefix: /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["MailOutlined"], {})
        }),
        name: "email",
        id: "user_email",
        type: "email",
        placeholder: "User Email",
        autoComplete: "email",
        defaultValue: ""
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Form"].Item, {
      label: "\uBE44\uBC00\uBC88\uD638",
      htmlFor: "user_password",
      validateStatus: errors.password ? 'error' : 'success',
      help: errors.password ? (_errors$password = errors.password) === null || _errors$password === void 0 ? void 0 : _errors$password.message : '',
      rules: [{
        message: (_errors$password2 = errors.password) === null || _errors$password2 === void 0 ? void 0 : _errors$password2.message
      }],
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_hook_form_["Controller"], {
        control: control,
        as: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Input"].Password, {
          prefix: /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["LockOutlined"], {})
        }),
        name: "password",
        id: "user_password",
        type: "password",
        placeholder: "Password",
        autoComplete: "current-password",
        defaultValue: ""
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Form"].Item, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"], {
        block: true,
        type: "primary",
        htmlType: "submit",
        loading: status === 'LOADING',
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["LoginOutlined"], {}), " Log in"]
      }), "Or", ' ', /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
        href: urls["h" /* SIGNUP_URL */],
        passHref: true,
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
          href: urls["f" /* PASS_HREF */],
          children: "register now!"
        })
      })]
    })]
  });
};

/* harmony default export */ var organism_LoginForm = (LoginForm);
// CONCATENATED MODULE: ./layouts/App/organism/UserProfile/index.tsx











const UserProfile = () => {
  var _myData$nickname;

  const dispatch = Object(external_react_redux_["useDispatch"])();
  const {
    status: logoutStatus
  } = Object(fetchStatus["f" /* useFetchStatus */])(user["g" /* logout */].TYPE);
  const myData = Object(external_react_redux_["useSelector"])(user["p" /* userSelector */].myData);
  const handleLogout = Object(external_react_["useCallback"])(() => {
    dispatch(user["g" /* logout */].requset({}));
  }, [dispatch]);
  if (!myData) return null;
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Card"], {
    actions: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
        href: Object(urls["d" /* GET_USER_URL */])(myData.id.toString()),
        passHref: true,
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("a", {
          href: urls["f" /* PASS_HREF */],
          children: ["\uAC8C\uC2DC\uAE00", /*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), myData.Posts.length]
        })
      })
    }, "twit"), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
        href: urls["g" /* PROFILE_URL */],
        passHref: true,
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("a", {
          href: urls["f" /* PASS_HREF */],
          children: ["\uD314\uB85C\uC789", /*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), myData.Followings.length]
        })
      })
    }, "followings"), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
        href: urls["g" /* PROFILE_URL */],
        passHref: true,
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("a", {
          href: urls["f" /* PASS_HREF */],
          children: ["\uD314\uB85C\uC6CC", /*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), myData.Followers.length]
        })
      })
    }, "followings")],
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Card"].Meta, {
      avatar: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
        href: Object(urls["d" /* GET_USER_URL */])(myData.id.toString()),
        passHref: true,
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
          href: urls["f" /* PASS_HREF */],
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Avatar"], {
            children: (_myData$nickname = myData.nickname) === null || _myData$nickname === void 0 ? void 0 : _myData$nickname[0]
          })
        })
      }),
      title: myData.nickname
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"], {
      style: {
        marginTop: 15
      },
      onClick: handleLogout,
      loading: logoutStatus === 'LOADING',
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["LogoutOutlined"], {}), "\uB85C\uADF8\uC544\uC6C3"]
    })]
  });
};

/* harmony default export */ var organism_UserProfile = (UserProfile);
// CONCATENATED MODULE: ./layouts/App/styles.ts



const globalStyles = react_["css"]`
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
`;
const SearchInput = styled_default()(external_antd_["Input"].Search)`
  vertical-align: middle;
`;
// CONCATENATED MODULE: ./layouts/App/index.tsx












const {
  Header,
  Content
} = external_antd_["Layout"];

const AppLayout = ({
  children
}) => {
  const router = Object(router_["useRouter"])();
  const {
    data: myData
  } = Object(user["n" /* useMyUser */])({});
  const {
    0: searchInput,
    1: setSearchInput
  } = Object(external_react_["useState"])('');
  const handleChangeSearchInput = Object(external_react_["useCallback"])(e => {
    setSearchInput(e.target.value);
  }, []);
  const handleSearch = Object(external_react_["useCallback"])(() => {
    router_default.a.push(Object(urls["a" /* GET_HASHTAG_URL */])(searchInput));
  }, [searchInput]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Layout"], {
    className: "layout",
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(react_["Global"], {
      styles: globalStyles
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Header, {
      style: {
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: '#FFF'
      },
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Menu"], {
        mode: "horizontal",
        defaultSelectedKeys: [router.pathname],
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Menu"].Item, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
            href: urls["e" /* HOME_URL */],
            passHref: true,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
              href: urls["f" /* PASS_HREF */],
              children: "urTweet"
            })
          })
        }, urls["e" /* HOME_URL */]), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Menu"].Item, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
            href: urls["g" /* PROFILE_URL */],
            passHref: true,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
              href: urls["f" /* PASS_HREF */],
              children: "\uD504\uB85C\uD544"
            })
          })
        }, urls["g" /* PROFILE_URL */]), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Menu"].Item, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(SearchInput, {
            enterButton: true,
            value: searchInput,
            onChange: handleChangeSearchInput,
            onSearch: handleSearch
          })
        }, "/search")]
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Content, {
      style: {
        padding: '0 50px',
        marginTop: 64,
        backgroundColor: '#FFF'
      },
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        style: {
          minHeight: 400,
          padding: 24
        },
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Row"], {
          gutter: 12,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Col"], {
            xs: 24,
            sm: 24,
            md: 8,
            lg: 4,
            style: {
              paddingTop: 12
            },
            children: myData ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(organism_UserProfile, {}) : /*#__PURE__*/Object(jsx_runtime_["jsx"])(organism_LoginForm, {})
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Col"], {
            xs: 24,
            sm: 24,
            md: 16,
            lg: 20,
            style: {
              paddingTop: 12
            },
            children: children
          })]
        })
      })
    })]
  });
};

/* harmony default export */ var App = __webpack_exports__["a"] = (AppLayout);

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "GXs3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = resolveRewrites;

function resolveRewrites() {}

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
/* unused harmony export axiosSetting */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return axios; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/**
 * 	* Basic
 * 	* Security scheme type:	HTTP
 * 	* HTTP Authorization Scheme	basic
 */

const axiosSetting = {
  scheme: 'https',
  host: 'api.urtweet.shop',
  api: '',
  port: '',

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

/***/ "Kps4":
/***/ (function(module, exports) {

module.exports = require("@emotion/react");

/***/ }),

/***/ "MaJT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);





const SEO = ({
  title,
  url,
  description,
  name,
  keywords
}) => {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      property: "og:type",
      content: "website"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      property: "og:site_name",
      content: "urTweet"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      property: "og:title",
      content: title
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      property: "og:url",
      content: url
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      property: "og:description",
      content: description
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      property: "og:image",
      content: "/favicon.ico"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      property: "og:image:height",
      content: "200"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      property: "og:image:width",
      content: "200"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      name: "name",
      content: name
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      name: "keywords",
      content: `urtweet ${keywords}`
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      name: "description",
      content: description
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      name: "robots",
      content: "index,follow"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("meta", {
      name: "googlebot",
      content: "index,follow,snippet,archive"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("link", {
      rel: "image_src",
      href: "/favicon.ico"
    })]
  });
};

/* harmony default export */ __webpack_exports__["a"] = (SEO);

/***/ }),

/***/ "Nh2W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__("UhrY"));

var _requestIdleCallback = __webpack_require__("0G5g"); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
} // Resolve a promise that times out after given amount of milliseconds.


function resolvePromiseWithTimeout(p, ms, err) {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    p.then(r => {
      // Resolved, cancel the timeout
      cancelled = true;
      resolve(r);
    }).catch(reject);
    (0, _requestIdleCallback.requestIdleCallback)(() => setTimeout(() => {
      if (!cancelled) {
        reject(err);
      }
    }, ms));
  });
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
}

function getFilesForRoute(assetPrefix, route) {
  if (false) {}

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route) {
      return withFuture(route, routes, async () => {
        try {
          const {
            scripts,
            css
          } = await getFilesForRoute(assetPrefix, route);
          const [, styles] = await Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
          const entrypoint = await resolvePromiseWithTimeout(this.whenEntrypoint(route), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`)));
          const res = Object.assign({
            styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        } catch (err) {
          return {
            error: err
          };
        }
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback.requestIdleCallback)(() => this.loadRoute(route));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

var _default = createRouteLoader;
exports.default = _default;

/***/ }),

/***/ "O/hg":
/***/ (function(module, exports) {

module.exports = require("react-slick");

/***/ }),

/***/ "Osoz":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

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

/***/ "TqRt":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "UhrY":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "UlNW":
/***/ (function(module, exports) {

module.exports = require("@emotion/styled");

/***/ }),

/***/ "X24+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
/**
* Removes the trailing slash of a path if there is one. Preserves the root path `/`.
*/

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}
/**
* Normalizes the trailing slash of a path according to the `trailingSlash` option
* in `next.config.js`.
*/


const normalizePathTrailingSlash =  false ? undefined : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YTqd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function parseParameter(param) {
  const optional = param.startsWith('[') && param.endsWith(']');

  if (optional) {
    param = param.slice(1, -1);
  }

  const repeat = param.startsWith('...');

  if (repeat) {
    param = param.slice(3);
  }

  return {
    key: param,
    repeat,
    optional
  };
}

function getRouteRegex(normalizedRoute) {
  const segments = (normalizedRoute.replace(/\/$/, '') || '/').slice(1).split('/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map(segment => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const {
        key,
        optional,
        repeat
      } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join(''); // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1; // builds a minimal routeKey using only a-z and minimal number of characters

    const getSafeRouteKey = () => {
      let routeKey = '';

      for (let i = 0; i < routeKeyCharLength; i++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;

        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }

      return routeKey;
    };

    const routeKeys = {};
    let namedParameterizedRoute = segments.map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const {
          key,
          optional,
          repeat
        } = parseParameter(segment.slice(1, -1)); // replace any non-word characters since they can break
        // the named regex

        let cleanedKey = key.replace(/\W/g, '');
        let invalidKey = false; // check if the key is still invalid and fallback to using a known
        // safe key

        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }

        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }

        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }

        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join('');
    return {
      re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
      groups,
      routeKeys,
      namedRegex: `^${namedParameterizedRoute}(?:/)?$`
    };
  }

  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups
  };
}

/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "bFqJ":
/***/ (function(module, exports) {

module.exports = require("regexify-string");

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

/***/ "cDf5":
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (false) {}
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  }).then(success => {
    if (!success) return;

    if (scroll) {
      // FIXME: proper route announcing at Router level, not Link:
      document.body.focus();
    }
  });
}

function Link(props) {
  if (false) {}

  const p = props.prefetch !== false;
  const router = (0, _router2.useRouter)();
  const pathname = router && router.pathname || '/';

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  const child = _react.Children.only(children);

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(() => {
    const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    const localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "dZ6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

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

/***/ "elyg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _routeLoader = __webpack_require__("Nh2W");

var _denormalizePagePath = __webpack_require__("wkBG");

var _normalizeLocalePath = __webpack_require__("3wub");

var _mitt = _interopRequireDefault(__webpack_require__("dZ6Y"));

var _utils = __webpack_require__("g/15");

var _isDynamic = __webpack_require__("/jkW");

var _parseRelativeUrl = __webpack_require__("hS4m");

var _querystring = __webpack_require__("3WeD");

var _resolveRewrites = _interopRequireDefault(__webpack_require__("GXs3"));

var _routeMatcher = __webpack_require__("gguc");

var _routeRegex = __webpack_require__("YTqd");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* global __NEXT_DATA__ */
// tslint:disable:no-console


let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {}

  return false;
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}
/**
* Detects whether a given url is routable by the Next.js router (browser only).
*/


function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils.getLocationOrigin)();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && ( // Interpolate group into data URL if present
    interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = ''; // did not satisfy all requirements
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
/**
* Resolves a given hyperlink with a certain router state (basePath not included).
* Preserves absolute urls.
*/


function resolveHref(currentPath, href, resolveAs) {
  // we use a dummy base url for relative urls
  const base = new URL(currentPath, 'http://n');
  const urlAsString = typeof href === 'string' ? href : (0, _utils.formatWithValidation)(href); // Return because it cannot be routed by the Next.js router

  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils.formatWithValidation)({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils.getLocationOrigin)();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router.pathname, url, true);
  const origin = (0, _utils.getLocationOrigin)();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router.pathname, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

function resolveDynamicRoute(parsedHref, pages, applyBasePath = true) {
  const {
    pathname
  } = parsedHref;
  const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(applyBasePath ? delBasePath(pathname) : pathname));

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return parsedHref;
  } // handle resolving href for dynamic routes


  if (!pages.includes(cleanPathname)) {
    // eslint-disable-next-line array-callback-return
    pages.some(page => {
      if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
        parsedHref.pathname = applyBasePath ? addBasePath(page) : page;
        return true;
      }
    });
  }

  parsedHref.pathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)(parsedHref.pathname);
  return parsedHref;
}

const manualScrollRestoration =  false && false;
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader.markAssetError)(err);
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  // In-flight Server Data Requests, for deduping
  constructor(_pathname, _query, _as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales,
    isPreview
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sdr = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;
    this._inFlightRoute = void 0;
    this._shallow = void 0;
    this.locale = void 0;
    this.locales = void 0;
    this.defaultLocale = void 0;
    this.domainLocales = void 0;
    this.isReady = void 0;
    this.isPreview = void 0;
    this.isLocaleDomain = void 0;
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname: addBasePath(pathname),
          query
        }), (0, _utils.getURL)());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname
      } = (0, _parseRelativeUrl.parseRelativeUrl)(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as === this.asPath && pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: [
        /* /_app does not need its stylesheets managed */
      ]
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic.isDynamicRoute)(_pathname) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? _pathname : _as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || !autoExportDynamic && !self.location.search);
    this.isPreview = !!isPreview;
    this.isLocaleDomain = false;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    var _options$scroll;

    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    } // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated


    if (options._h) {
      this.isReady = true;
    } // Default to scroll reset behavior unless explicitly specified to be
    // `false`! This makes the behavior between using `Router#push` and a
    // `<Link />` consistent.


    options.scroll = !!((_options$scroll = options.scroll) != null ? _options$scroll : true);
    let localeChange = options.locale !== this.locale;

    if (false) { var _this$locales; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs)) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname,
      query
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
    } catch (err) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    }

    parsed = resolveDynamicRoute(parsed, pages);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1


    pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname; // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url

    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    }

    let route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname); // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly

    let resolvedAs = as;

    if (false) {}

    if (!isLocalURL(as)) {
      if (false) {}

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic.isDynamicRoute)(route)) {
      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex.getRouteRegex)(route);
      const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

        if (missingParams.length > 0) {
          if (false) {}

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://err.sh/vercel/next.js/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      var _self$__NEXT_DATA__$p, _self$__NEXT_DATA__$p2;

      let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
            resolveDynamicRoute(parsedHref, pages, false);

            if (pages.includes(parsedHref.pathname)) {
              const {
                url: newUrl,
                as: newAs
              } = prepareUrlAs(this, destination, destination);
              return this.change(method, newUrl, newAs, options);
            }
          }

          window.location.href = destination;
          return new Promise(() => {});
        }

        this.isPreview = !!props.__N_PREVIEW; // handle SSG data 404

        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (false) {} // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;

      if (options._h && pathname === '/_error' && ((_self$__NEXT_DATA__$p = self.__NEXT_DATA__.props) == null ? void 0 : (_self$__NEXT_DATA__$p2 = _self$__NEXT_DATA__$p.pageProps) == null ? void 0 : _self$__NEXT_DATA__$p2.statusCode) === 500 && props != null && props.pageProps) {
        // ensure statusCode is still correct for static 500 page
        // when updating query information
        props.pageProps.statusCode = 500;
      }

      await this.set(route, pathname, query, cleanedAs, routeInfo, forcedScroll || (isValidShallowRoute || !options.scroll ? null : {
        x: 0,
        y: 0
      })).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err) {
      if (err.cancelled) {
        return false;
      }

      throw err;
    }
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component;
      let styleSheets;
      let props;

      if (typeof Component === 'undefined' || typeof styleSheets === 'undefined') {
        ;
        ({
          page: Component,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (false) {}

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(err, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value or `#top`
    // To mirror browsers

    if (hash === '' || hash === 'top') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    parsed = resolveDynamicRoute(parsed, pages, false);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    }

    let route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
    let resolvedAs = asPath;

    if (false) {} // Prefetch is not supported in development mode because it would trigger on-demand-entries


    if (false) {}

    await Promise.all([this.pageLoader._isSsg(url).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, resolvedAs, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if ( true && !this.isPreview && this.sdc[cacheKey]) {
      return Promise.resolve(this.sdc[cacheKey]);
    }

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    const {
      href: resourceKey
    } = new URL(dataHref, window.location.href);

    if (this.sdr[resourceKey]) {
      return this.sdr[resourceKey];
    }

    return this.sdr[resourceKey] = fetchNextData(dataHref, this.isSsr).then(data => {
      delete this.sdr[resourceKey];
      return data;
    }).catch(err => {
      delete this.sdr[resourceKey];
      throw err;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _formatUrl = __webpack_require__("6D7l");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (false) { var _App$prototype; } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (false) {}

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "gguc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

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

/***/ "hS4m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__("g/15");

var _querystring = __webpack_require__("3WeD");
/**
* Parses path-relative urls (e.g. `/hello/world?foo=bar`). If url isn't path-relative
* (e.g. `./hello`) then at least base must be.
* Absolute urls are rejected with one exception, in the browser, absolute urls that are on
* the current origin will be parsed as relative
*/


function parseRelativeUrl(url, base) {
  const globalBase = new URL(true ? 'http://n' : undefined);
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const {
    pathname,
    searchParams,
    search,
    hash,
    href,
    origin
  } = new URL(url, resolvedBase);

  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url}`);
  }

  return {
    pathname,
    query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}

/***/ }),

/***/ "mtVR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__("nZwT");

// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__("Exp3");

// EXTERNAL MODULE: external "dayjs"
var external_dayjs_ = __webpack_require__("boVf");
var external_dayjs_default = /*#__PURE__*/__webpack_require__.n(external_dayjs_);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./modules/fetchStatus/index.ts + 2 modules
var fetchStatus = __webpack_require__("o0LO");

// EXTERNAL MODULE: ./modules/post/index.ts
var post = __webpack_require__("bQCO");

// EXTERNAL MODULE: ./modules/user/index.ts + 1 modules
var user = __webpack_require__("Szyw");

// EXTERNAL MODULE: ./utils/urls.ts
var urls = __webpack_require__("ryrK");

// EXTERNAL MODULE: external "@hookform/resolvers/yup"
var yup_ = __webpack_require__("4FCN");

// EXTERNAL MODULE: external "react-hook-form"
var external_react_hook_form_ = __webpack_require__("BTiB");

// EXTERNAL MODULE: external "yup"
var external_yup_ = __webpack_require__("C8TP");

// CONCATENATED MODULE: ./components/PostCard/CommentForm/index.tsx











const COMMENT_SCHEMA = external_yup_["object"]({
  content: external_yup_["string"]().min(3, '댓글은 3자 이상 입력하여 주십시오.').required('댓글은 필수 입력 항목 입니다.')
});

const CommentForm = ({
  data
}) => {
  var _errors$content, _errors$content2;

  const dispatch = Object(external_react_redux_["useDispatch"])();
  const {
    status
  } = Object(fetchStatus["f" /* useFetchStatus */])(post["b" /* createComment */].TYPE);
  const myData = Object(external_react_redux_["useSelector"])(user["p" /* userSelector */].myData);
  const {
    control,
    handleSubmit: checkSubmit,
    errors,
    reset
  } = Object(external_react_hook_form_["useForm"])({
    mode: 'onBlur',
    resolver: Object(yup_["yupResolver"])(COMMENT_SCHEMA)
  });
  const handleSubmit = Object(external_react_["useMemo"])(() => {
    return checkSubmit(async formData => {
      reset();
      if (!(myData !== null && myData !== void 0 && myData.id)) return;

      try {
        await dispatch(post["b" /* createComment */].asyncTunk({
          url: {
            postId: data.id
          },
          body: {
            content: formData.content,
            userId: myData.id
          }
        }));
        external_antd_["message"].success('댓글이 등록되었습니다.');
      } catch (error) {
        external_antd_["message"].error(JSON.stringify(error.response.data));
      }
    });
  }, [checkSubmit, dispatch, myData, data === null || data === void 0 ? void 0 : data.id, reset]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Form"], {
    onFinish: handleSubmit,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Form"].Item, {
      validateStatus: errors.content ? 'error' : 'success',
      help: errors.content ? (_errors$content = errors.content) === null || _errors$content === void 0 ? void 0 : _errors$content.message : '',
      rules: [{
        message: errors === null || errors === void 0 ? void 0 : (_errors$content2 = errors.content) === null || _errors$content2 === void 0 ? void 0 : _errors$content2.message
      }],
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_hook_form_["Controller"], {
        control: control,
        as: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Input"].TextArea, {
          maxLength: 50,
          autoSize: {
            minRows: 2,
            maxRows: 4
          }
        }),
        name: "content",
        id: "content",
        placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.",
        defaultValue: ""
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      style: {
        position: 'relative',
        margin: 0
      },
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Button"], {
        style: {
          position: 'absolute',
          right: 0,
          top: '-15px',
          zIndex: 1
        },
        type: "primary",
        htmlType: "submit",
        loading: status === 'LOADING',
        children: "\uB313\uAE00\uB2EC\uAE30"
      })
    })]
  });
};

/* harmony default export */ var PostCard_CommentForm = (CommentForm);
// CONCATENATED MODULE: ./components/PostCard/CommentList/index.tsx







const CommentList = ({
  data
}) => /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["List"], {
  itemLayout: "horizontal",
  dataSource: data.Comments,
  renderItem: item => /*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Comment"], {
      author: item.User.nickname,
      avatar: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
        href: Object(urls["d" /* GET_USER_URL */])(item.User.id.toString()),
        passHref: true,
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
          href: urls["f" /* PASS_HREF */],
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Avatar"], {
            children: item.User.nickname[0]
          })
        })
      }),
      content: item.content,
      datetime: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Tooltip"], {
        title: external_dayjs_default()(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          children: external_dayjs_default()(item.createdAt).fromNow()
        })
      })
    })
  })
});

/* harmony default export */ var PostCard_CommentList = (CommentList);
// CONCATENATED MODULE: ./components/PostCard/FollowButton/index.tsx








const FollowButton = ({
  data
}) => {
  const dispatch = Object(external_react_redux_["useDispatch"])();
  const myData = Object(external_react_redux_["useSelector"])(user["p" /* userSelector */].myData);
  const {
    status: followStatus
  } = Object(fetchStatus["f" /* useFetchStatus */])(user["c" /* follow */].TYPE);
  const {
    status: unfollowStatus
  } = Object(fetchStatus["f" /* useFetchStatus */])(user["m" /* unFollow */].TYPE);
  const isFollowing = Object(external_react_["useMemo"])(() => !!(myData !== null && myData !== void 0 && myData.Followings.find(_ => _.id === data.User.id)), [data.User.id, myData === null || myData === void 0 ? void 0 : myData.Followings]);
  const handleToogleFollow = Object(external_react_["useCallback"])(() => {
    if (isFollowing) dispatch(user["m" /* unFollow */].requset({
      userId: data.User.id
    }));else dispatch(user["c" /* follow */].requset({
      userId: data.User.id
    }));
  }, [data.User.id, dispatch, isFollowing]);

  if (!myData || data.User.id === myData.id) {
    return null;
  }

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Button"], {
    size: "small",
    type: isFollowing ? undefined : 'primary',
    icon: isFollowing ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["UserDeleteOutlined"], {}) : /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["UserAddOutlined"], {}),
    loading: followStatus === 'LOADING' || unfollowStatus === 'LOADING',
    onClick: handleToogleFollow,
    children: isFollowing ? '언팔로우' : '팔로우'
  });
};

/* harmony default export */ var PostCard_FollowButton = (FollowButton);
// EXTERNAL MODULE: external "regexify-string"
var external_regexify_string_ = __webpack_require__("bFqJ");
var external_regexify_string_default = /*#__PURE__*/__webpack_require__.n(external_regexify_string_);

// CONCATENATED MODULE: ./components/PostCard/PostCardContent/index.tsx













const POST_SCHEMA = external_yup_["object"]({
  content: external_yup_["string"]().min(3, '게시글은 3자 이상 입력하여 주십시오.').required('게시글은 필수 입력 항목 입니다.')
});

const PostCardContent = ({
  postId,
  postContent,
  editMode = false,
  isUpdateLoading = false,
  onCancleEditMode
}) => {
  var _errors$content, _errors$content2;

  const dispatch = Object(external_react_redux_["useDispatch"])();
  const {
    control,
    handleSubmit: checkSubmit,
    errors,
    reset
  } = Object(external_react_hook_form_["useForm"])({
    mode: 'onBlur',
    resolver: Object(yup_["yupResolver"])(POST_SCHEMA),
    defaultValues: {
      content: postContent
    }
  });
  const HashTagPostContent = Object(external_react_["useMemo"])(() => external_regexify_string_default()({
    input: postContent,
    pattern: /(#[^\s#]+)/g,

    decorator(word, index) {
      if (word.match(/(#[^\s#]+)/)) {
        // word => #hasgh
        return /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
          href: Object(urls["a" /* GET_HASHTAG_URL */])(word.slice(1)),
          passHref: true,
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            href: urls["f" /* PASS_HREF */],
            children: word
          })
        }, index);
      }

      return word;
    }

  }), [postContent]);
  const handleChangePost = Object(external_react_["useMemo"])(() => {
    return checkSubmit(async formData => {
      reset();

      try {
        await dispatch(post["h" /* modifyPost */].asyncTunk({
          url: {
            postId
          },
          body: {
            content: formData.content
          }
        }));
        external_antd_["message"].success('게시글이 수정 되었습니다.');
      } catch (error) {
        external_antd_["message"].error(JSON.stringify(error.response.data));
      } finally {
        onCancleEditMode();
      }
    });
  }, [checkSubmit, dispatch, onCancleEditMode, postId, reset]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
    children: editMode ? /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Form"], {
      style: {
        marginBottom: '20px'
      },
      onFinish: handleChangePost,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Form"].Item, {
        validateStatus: errors.content ? 'error' : 'success',
        help: errors.content ? (_errors$content = errors.content) === null || _errors$content === void 0 ? void 0 : _errors$content.message : '',
        rules: [{
          message: errors === null || errors === void 0 ? void 0 : (_errors$content2 = errors.content) === null || _errors$content2 === void 0 ? void 0 : _errors$content2.message
        }],
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_hook_form_["Controller"], {
          control: control,
          as: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Input"].TextArea, {
            maxLength: 140,
            autoSize: {
              minRows: 3,
              maxRows: 5
            }
          }),
          name: "content",
          id: "edit_content",
          placeholder: "\uAC8C\uC2DC\uAE00\uC744 \uC791\uC131\uD574 \uC8FC\uC138\uC694."
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"].Group, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"], {
          type: "primary",
          htmlType: "submit",
          loading: isUpdateLoading,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["EditOutlined"], {}), " \uC218\uC815"]
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"], {
          onClick: onCancleEditMode,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["UndoOutlined"], {}), " \uCDE8\uC18C"]
        })]
      })]
    }) : [HashTagPostContent]
  });
};

/* harmony default export */ var PostCard_PostCardContent = (PostCardContent);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__("Kps4");

// EXTERNAL MODULE: external "react-slick"
var external_react_slick_ = __webpack_require__("O/hg");
var external_react_slick_default = /*#__PURE__*/__webpack_require__.n(external_react_slick_);

// EXTERNAL MODULE: external "@emotion/styled"
var styled_ = __webpack_require__("UlNW");
var styled_default = /*#__PURE__*/__webpack_require__.n(styled_);

// CONCATENATED MODULE: ./components/ImagesZoom/styles.ts



const Overlay = styled_default.a.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Header = styled_default.a.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;
const CloseBtn = styled_default()(icons_["CloseOutlined"])`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;
const SlickWrapper = styled_default.a.div`
  height: calc(100% - 44px);
  background: #090909;
`;
const ImgWrapper = styled_default.a.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;
const Indicator = styled_default.a.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;
const globalStyles = react_["css"]`
  .slick-slide {
    display: inline-block;
  }

  .ant-card-cover {
    transform: none !important;
  }
`;
// CONCATENATED MODULE: ./components/ImagesZoom/index.tsx








const ImagesZoom = ({
  images,
  onClose
}) => {
  const {
    0: currentSlide,
    1: setCurrentSlide
  } = Object(external_react_["useState"])(0);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Overlay, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(react_["Global"], {
      styles: globalStyles
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Header, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h1", {
        children: "\uC0C1\uC138 \uC774\uBBF8\uC9C0"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CloseBtn, {
        onClick: onClose,
        children: "X"
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(SlickWrapper, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_slick_default.a, {
          initialSlide: 0,
          afterChange: slide => setCurrentSlide(slide),
          infinite: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          children: images.map(image => /*#__PURE__*/Object(jsx_runtime_["jsx"])(ImgWrapper, {
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
              src: Object(urls["b" /* GET_IMAGE_URL */])(image.src, true),
              alt: image.src
            })
          }, image.src))
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Indicator, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            children: [currentSlide + 1, " / ", images.length]
          })
        })]
      })
    })]
  });
};

/* harmony default export */ var components_ImagesZoom = (ImagesZoom);
// CONCATENATED MODULE: ./components/PostCard/PostImages/index.tsx







const PostImages = ({
  images
}) => {
  const {
    0: showImagesZoom,
    1: setShowImagesZoom
  } = Object(external_react_["useState"])(false);
  const handleZoom = Object(external_react_["useCallback"])(() => {
    setShowImagesZoom(true);
  }, []);
  const handleClose = Object(external_react_["useCallback"])(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
        src: Object(urls["b" /* GET_IMAGE_URL */])(images[0].src),
        alt: images[0].src,
        style: {
          width: '100%',
          display: 'inline-block'
        },
        role: "presentation",
        onClick: handleZoom
      }), showImagesZoom && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_ImagesZoom, {
        images: images,
        onClose: handleClose
      })]
    });
  }

  if (images.length === 2) {
    return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
        src: Object(urls["b" /* GET_IMAGE_URL */])(images[0].src),
        alt: images[0].src,
        style: {
          width: '50%',
          display: 'inline-block'
        },
        role: "presentation",
        onClick: handleZoom
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
        src: Object(urls["b" /* GET_IMAGE_URL */])(images[1].src),
        alt: images[1].src,
        role: "presentation",
        style: {
          width: '50%',
          display: 'inline-block'
        },
        onClick: handleZoom
      }), showImagesZoom && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_ImagesZoom, {
        images: images,
        onClose: handleClose
      })]
    });
  }

  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    style: {
      position: 'relative'
    },
    children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
        src: Object(urls["b" /* GET_IMAGE_URL */])(images[0].src),
        alt: images[0].src,
        style: {
          width: '50%',
          display: 'inline-block'
        },
        role: "presentation",
        onClick: handleZoom
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
        src: Object(urls["b" /* GET_IMAGE_URL */])(images[1].src),
        alt: images[0].src,
        style: {
          width: '50%',
          display: 'inline-block'
        },
        role: "presentation",
        onClick: handleZoom
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        role: "presentation",
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 50%)',
          borderRadius: '.5em',
          padding: 10,
          textAlign: 'center',
          color: '#fff',
          lineHeight: '30px'
        },
        onClick: handleZoom,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["PlusOutlined"], {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), images.length - 2, "\uAC1C\uC758 \uC0AC\uC9C4 \uB354\uBCF4\uAE30"]
      })]
    }), showImagesZoom && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_ImagesZoom, {
      images: images,
      onClose: handleClose
    })]
  });
};

/* harmony default export */ var PostCard_PostImages = (PostImages);
// CONCATENATED MODULE: ./components/PostCard/index.tsx


















const PostCard = ({
  data
}) => {
  var _useSelector;

  const dispatch = Object(external_react_redux_["useDispatch"])();
  const myId = (_useSelector = Object(external_react_redux_["useSelector"])(user["p" /* userSelector */].myData)) === null || _useSelector === void 0 ? void 0 : _useSelector.id;
  const {
    status: removePostStatus
  } = Object(fetchStatus["f" /* useFetchStatus */])(post["k" /* removePost */].TYPE);
  const {
    0: commentFormOpened,
    1: setCommentFormOpened
  } = Object(external_react_["useState"])(false);
  const {
    0: editMode,
    1: setEditMode
  } = Object(external_react_["useState"])(false);
  const isLike = Object(external_react_["useMemo"])(() => {
    var _data$Likers$find;

    return !!((_data$Likers$find = data.Likers.find(v => v.id === myId)) !== null && _data$Likers$find !== void 0 && _data$Likers$find.id);
  }, [data.Likers, myId]);
  const handleRetweet = Object(external_react_["useCallback"])(() => {
    if (!myId) {
      external_antd_["message"].warn('로그인이 필요합니다.');
      return;
    }

    dispatch(post["l" /* retweetPost */].requset({
      postId: data.id
    }));
  }, [data.id, dispatch, myId]);
  const handleToggleLike = Object(external_react_["useCallback"])(() => {
    if (!myId) {
      external_antd_["message"].warn('로그인이 필요합니다.');
      return;
    }

    if (!isLike) dispatch(post["e" /* likePost */].requset({
      postId: data.id
    }));else dispatch(post["m" /* unlikePost */].requset({
      postId: data.id
    }));
  }, [data.id, dispatch, isLike, myId]);
  const handleToggleComment = Object(external_react_["useCallback"])(() => {
    setCommentFormOpened(prev => !prev);
  }, []);
  const handleEditMode = Object(external_react_["useCallback"])(() => {
    setEditMode(true);
  }, []);
  const handleCancleEditMode = Object(external_react_["useCallback"])(() => {
    setEditMode(false);
  }, []);
  const handleRemovePost = Object(external_react_["useCallback"])(() => {
    if (!myId) {
      external_antd_["message"].warn('로그인이 필요합니다.');
      return;
    }

    dispatch(post["k" /* removePost */].requset({
      postId: data.id
    }));
  }, [data.id, dispatch, myId]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
    style: {
      marginBottom: 20
    },
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Card"], {
      cover: data.Images.length && /*#__PURE__*/Object(jsx_runtime_["jsx"])(PostCard_PostImages, {
        images: data.Images
      }),
      hoverable: true,
      actions: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["RetweetOutlined"], {
        title: "\uB9AC\uD2B8\uC717",
        onClick: handleRetweet
      }, "retweet"), isLike ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["HeartTwoTone"], {
        twoToneColor: "#eb2f96",
        title: "\uC88B\uC544\uC694",
        onClick: handleToggleLike
      }, "heart") : /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["HeartOutlined"], {
        title: "\uC88B\uC544\uC694",
        onClick: handleToggleLike
      }, "heart"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["MessageOutlined"], {
        title: "\uB313\uAE00",
        onClick: handleToggleComment
      }, "comment"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Popover"], {
        content: myId && data.User.id === myId && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"].Group, {
          children: [!data.RetweetId && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"], {
            type: "primary",
            onClick: handleEditMode,
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["EditOutlined"], {}), " \uC218\uC815"]
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Popconfirm"], {
            title: "\uC815\uB9D0\uB85C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
            okText: "\uC0AD\uC81C",
            onConfirm: handleRemovePost,
            cancelText: "\uCDE8\uC18C",
            children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_antd_["Button"], {
              loading: removePostStatus === 'LOADING',
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["DeleteOutlined"], {}), " \uC0AD\uC81C"]
            })
          })]
        }),
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["EllipsisOutlined"], {})
      }, "more")],
      title: data.RetweetId && `${data.User.nickname}님이 리트윗하셨습니다.`,
      extra: myId && data.User.id !== myId && /*#__PURE__*/Object(jsx_runtime_["jsx"])(PostCard_FollowButton, {
        data: data
      }),
      children: [data.RetweetId && data.Retweet ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Card"], {
        cover: data.Retweet.Images.length && /*#__PURE__*/Object(jsx_runtime_["jsx"])(PostCard_PostImages, {
          images: data.Retweet.Images
        }),
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Card"].Meta, {
          avatar: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
            href: Object(urls["d" /* GET_USER_URL */])(data.Retweet.User.id.toString()),
            passHref: true,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
              href: urls["f" /* PASS_HREF */],
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Avatar"], {
                children: data.Retweet.User.nickname[0]
              })
            })
          }),
          title: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            children: [data.Retweet.User.nickname, /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Tooltip"], {
              title: external_dayjs_default()(data.Retweet.createdAt).format('YYYY-MM-DD HH:mm:ss'),
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                style: {
                  color: '#ccc',
                  marginLeft: '10px',
                  fontSize: '14px'
                },
                children: external_dayjs_default()(data.Retweet.createdAt).fromNow()
              })
            })]
          }),
          description: /*#__PURE__*/Object(jsx_runtime_["jsx"])(PostCard_PostCardContent, {
            postId: data.id,
            postContent: data.content,
            onCancleEditMode: handleCancleEditMode
          })
        })
      }) : /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Card"].Meta, {
        avatar: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
          href: Object(urls["d" /* GET_USER_URL */])(data.User.id.toString()),
          passHref: true,
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            href: urls["f" /* PASS_HREF */],
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Avatar"], {
              children: data.User.nickname[0]
            })
          })
        }),
        title: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          children: [data.User.nickname, /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Tooltip"], {
            title: external_dayjs_default()(data.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
              style: {
                color: '#ccc',
                marginLeft: '10px',
                fontSize: '14px'
              },
              children: external_dayjs_default()(data.createdAt).fromNow()
            })
          })]
        }),
        description: /*#__PURE__*/Object(jsx_runtime_["jsx"])(PostCard_PostCardContent, {
          editMode: editMode,
          postId: data.id,
          postContent: data.content,
          onCancleEditMode: handleCancleEditMode
        })
      }), commentFormOpened && /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_antd_["Divider"], {
          plain: true,
          children: `${data.Comments.length}개의 댓글`
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(PostCard_CommentList, {
          data: data
        }), myId && /*#__PURE__*/Object(jsx_runtime_["jsx"])(PostCard_CommentForm, {
          data: data
        })]
      })]
    })
  });
};

/* harmony default export */ var components_PostCard = __webpack_exports__["a"] = (PostCard);

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("Osoz");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isPreview', 'isLocaleDomain'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "nZwT":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons");

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

/***/ "ryrK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PASS_HREF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return HOME_URL; });
/* unused harmony export POST_URL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PROFILE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SIGNUP_URL; });
/* unused harmony export HASNTAG_URL */
/* unused harmony export USER_URL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GET_HASHTAG_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GET_IMAGE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GET_USER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GET_POST_URL; });
const PASS_HREF = 'PASS_HREF';
const HOME_URL = '/';
const POST_URL = '/post/[id]';
const PROFILE_URL = '/profile';
const SIGNUP_URL = '/signup';
const HASNTAG_URL = '/hashtag/:hashtag';
const USER_URL = '/user/[id]';
const GET_HASHTAG_URL = hashtag => {
  return HASNTAG_URL.replace(':hashtag', hashtag);
};
const GET_IMAGE_URL = (src, isOriginal = false) => {
  if (isOriginal) {
    return src.replace(/\/thumb\//, '/original/');
  }

  return src;
};
const GET_USER_URL = id => {
  return USER_URL.replace('[id]', id);
};
const GET_POST_URL = id => {
  return POST_URL.replace('[id]', id);
};

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("cDcd");

var _requestIdleCallback = __webpack_require__("0G5g");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "wkBG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "zlJt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEAFULT_PAGE_SIZE; });
const DEAFULT_PAGE_SIZE = 10;

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });