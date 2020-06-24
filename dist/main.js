/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodeCollection {\n    constructor(elements) {\n        this.elements = elements;\n    }\n\n    html(setHTML) {\n        // check if arg is string first?\n        if (setHTML) {\n            this.elements.forEach(ele => ele.innerHTML = setHTML);\n        } else {\n            return this.elements[0].innerHTML;\n        }\n    }\n\n    css(propName, val) {\n        if (typeof val === 'undefined') {\n            const ele = this.elements[0];\n            return window.getComputedStyle(ele).getPropertyValue(propName);\n        } else {\n            if (typeof val === 'number') val = `${parseFloat(val)}px`;\n            this.elements.forEach(ele => ele.style[propName] = val);\n        }\n    }\n\n    empty() {\n        this.elements.forEach(ele => ele.html = '');\n    }\n\n    append(content) {\n        if (typeof content === 'string') {\n            this.elements.forEach(ele => ele.innerHTML += content);\n        } else if (content instanceof HTMLElement) {\n            this.elements.forEach(ele => ele.innerHTML += content.outerHTML);\n        } else if (content instanceof DomNodeCollection) {\n            this.elements.forEach(ele => {\n                content.elements.forEach(appendEle => ele.innerHTML += appendEle.outerHTML);\n            })\n        }\n    }\n\n    attr(attrName, val) {\n        if (typeof val === 'undefined') {\n            return this.elements[0].getAttribute(attrName);\n        } else {\n            this.elements.forEach(ele => ele.setAttribute(attrName, val));\n        }\n    }\n\n    addClass(className) {\n        this.elements.forEach(ele => ele.classList.add(className));\n    }\n\n    removeClass(className) {\n        this.elements.forEach(ele => ele.classList.remove(className));\n    }\n\n    /*\n     * TRAVERSAL\n     */\n\n    first() {\n        return this.elements[0];\n    }\n\n    last() {\n        return this.elements[this.elements.length - 1];\n    }\n\n    children() {\n        const allChildren = [];\n        this.elements.forEach(ele => allChildren.push(...ele.children));\n\n        return new DomNodeCollection(allChildren);\n    }\n\n    parent() {\n        const allParents = new Set();\n        this.elements.forEach(ele => allParents.add(ele.parentNode));\n\n        return new DomNodeCollection(Array.from(allParents));\n    }\n\n    find(selector) {\n        const foundEles = [];\n        this.elements.forEach(ele => foundEles.push(...ele.querySelectorAll(selector)));\n\n        return new DomNodeCollection(foundEles);\n    }\n\n    remove(selector) {\n        let eles = selector ? this.find(selector).elements : this.elements;\n\n        eles.forEach(ele => ele.remove());\n    }\n\n    /*\n     * EVENT HANDLERS\n     */\n\n    on(type, cb) {\n        this.elements.forEach( ele => {\n            if (!ele.hasOwnProperty('eventCallbacks')) {\n                ele.eventCallbacks = {};\n            }\n\n            ele.addEventListener(type, cb); \n            ele.eventCallbacks[type] = ele.eventCallbacks[type] || [];\n            ele.eventCallbacks[type].push(cb);\n        });\n    }\n\n    off(type) {\n        this.elements.forEach( ele => {\n            ele.eventCallbacks[type].forEach(cb => {\n                ele.removeEventListener(type, cb); \n            });\n        });\n    }\n\n\n}\n\nmodule.exports = DomNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// const snake = require('.')\n\nclass GameController {\n    constructor() {\n        this.wrapper = $l('.wrapper');\n        this.gameArea = $l('.game-area');\n        this.setGameDimensions();\n\n    }\n    \n    setGameDimensions() {\n        const width = this.gameArea.css(\"width\");\n        this.gameArea.css(\"height\", width);\n    }\n    \n}\n\nmodule.exports = GameController;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./query.js */ \"./src/query.js\");\nconst snakeGame = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n$l(() => {\n    // Page loaded\n    const game = new snakeGame();\n\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/query.js":
/*!**********************!*\
  !*** ./src/query.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const domNode = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nconst docQueue = [];\n\nwindow.$l = (arg) => {\n    if (typeof arg === 'string') {\n        const nodes = document.querySelectorAll(arg);\n        return new domNode(Array.from(nodes));\n    } else if (arg instanceof HTMLElement) {\n        return new domNode(arg);\n    } else if (typeof arg === 'function') {\n        if (document.readyState === 'loading') {\n            // if this is the first function added to queue, set up event listener to run whole queue once doc is loaded\n            if (!docQueue.length) document.addEventListener('DOMContentLoaded', runDocQueue);\n            docQueue.push(arg);\n        } else {\n            arg();\n        }\n    }\n}\n\n$l.ajax = options => {\n    const req = new XMLHttpRequest();\n\n    const defaults = {\n        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n        method: 'GET',\n        url: '',\n        success: () => { },\n        error: () => { },\n        data: {},\n    };\n\n    // set any defaults for options not passed as argument\n    options = $l.extend(defaults, options);\n    options.method = options.method.toUpperCase();\n\n    // from jQuery docs: `data: Data to be sent to the server. It is converted to a query string, if not already a string. It's appended to the url for GET-requests.`\n    if (options.method === 'GET') {\n        options.url += toQuery(options.data);\n    }\n\n    return new Promise((resolve, reject) => {\n        req.open(options.method, options.url);\n\n        req.onload = () => {\n            if (req.readyState === 4) {\n                if (req.status === 200) {\n                    options.success(JSON.parse(req.response));\n                    resolve(JSON.parse(req.response));\n                } else {\n                    options.error(JSON.parse(req.response));\n                    reject(JSON.parse(req.response));\n                }\n            }\n        }\n\n        req.onerror = () => {\n            console.log('An error occurred');\n            reject();\n        }\n\n        req.send(JSON.stringify(options.data));\n    })\n}\n\nrunDocQueue = () => {\n    docQueue.forEach(fn => fn());\n}\n\n$l.extend = (merger, ...others) => {\n    others.forEach(other => {\n        for (let prop in other) {\n            merger[prop] = other[prop];\n        }\n    })\n\n    return merger;\n}\n\ntoQuery = (data) => {\n    query = '?';\n\n    for (let key in data) {\n        query += `${key}=${data[key]}&`;\n    }\n\n    return query;\n}\n\n// module.exports = {\n//     w\n// }\n\n\n// $l.ajax({\n//     type: 'GET',\n//     url: \"http://dummy.restapiexample.com/api/v1/employees\"\n// }).then( data => console.log(data)).catch(error => console.log(error));\n\n//# sourceURL=webpack:///./src/query.js?");

/***/ })

/******/ });