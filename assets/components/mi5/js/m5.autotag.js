(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("M5Input"));
	else if(typeof define === 'function' && define.amd)
		define(["M5Input"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("M5Input")) : factory(root["M5Input"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var M5Input = __webpack_require__(1);

	var M5AutoTag = exports.M5AutoTag = function (_M5Input) {
	  _inherits(M5AutoTag, _M5Input);

	  function M5AutoTag() {
	    var element = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
	    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, M5AutoTag);

	    var _this = _possibleConstructorReturn(this, (M5AutoTag.__proto__ || Object.getPrototypeOf(M5AutoTag)).call(this, element, {
	      caseSensitive: false,
	      separator: ',',
	      inputSelector: 'input[type="text"]',
	      tagsHolder: '.auto-tags'
	    }, opts));

	    if (_this.getElement()) {
	      _this.init();
	    }
	    return _this;
	  }

	  _createClass(M5AutoTag, [{
	    key: 'init',
	    value: function init() {
	      var element = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

	      _get(M5AutoTag.prototype.__proto__ || Object.getPrototypeOf(M5AutoTag.prototype), 'init', this).call(this, element);
	      this.assignTagsInputListener();
	      this.assignTagCheckboxesListeners();
	    }
	  }, {
	    key: 'getTagsInput',
	    value: function getTagsInput() {
	      return this.getElement().querySelector(this.getOpts().inputSelector);
	    }
	  }, {
	    key: 'getTagsHolder',
	    value: function getTagsHolder() {
	      return this.getElement().querySelector(this.getOpts().tagsHolder);
	    }
	  }, {
	    key: 'getTags',
	    value: function getTags() {
	      return this.getTagsInput().value.split(this.getOpts().separator).map(function (tag) {
	        return tag.trim();
	      }).filter(function (tag) {
	        return tag;
	      });
	    }
	  }, {
	    key: 'getTagCheckboxes',
	    value: function getTagCheckboxes() {
	      return this.getTagsHolder().querySelectorAll('input[type="checkbox"]');
	    }
	  }, {
	    key: 'assignTagCheckboxesListeners',
	    value: function assignTagCheckboxesListeners() {
	      var _this2 = this;

	      var tagCheckboxes = this.getTagCheckboxes(),
	          separator = this.getOpts().separator;

	      for (var i = 0; i < tagCheckboxes.length; i++) {
	        tagCheckboxes[i].addEventListener('change', function (event) {
	          var tags = _this2.getTags(),
	              opts = _this2.getOpts();

	          if (!opts.caseSensitive) {
	            tags = tags.map(function (tag) {
	              return tag.toLowerCase() == event.target.value.toLowerCase() ? event.target.value : tag;
	            });
	          }

	          if (event.target.checked) {
	            if (!tags.includes(event.target.value)) tags.push(event.target.value);
	          } else {
	            tags = tags.filter(function (tag) {
	              return tag !== event.target.value;
	            });
	          }

	          _this2.getTagsInput().value = tags.join(separator + ' ');
	        });
	      }
	    }
	  }, {
	    key: 'assignTagsInputListener',
	    value: function assignTagsInputListener() {
	      var _this3 = this;

	      var tagCheckboxes = this.getTagCheckboxes(),
	          opts = this.getOpts();

	      this.getTagsInput().addEventListener('input', function (event) {
	        var tags = _this3.getTags();

	        if (!opts.caseSensitive) {
	          tags = tags.map(function (tag) {
	            return tag.toLowerCase();
	          });
	        }

	        for (var i = 0; i < tagCheckboxes.length; i++) {
	          tagCheckboxes[i].checked = false;
	        }for (var _i = 0; _i < tagCheckboxes.length; _i++) {
	          var tagCheckbox = tagCheckboxes[_i];
	          if (tags.includes(!opts.caseSensitive ? tagCheckbox.value.toLowerCase() : tagCheckbox.value)) tagCheckbox.checked = true;
	        }
	      });
	    }
	  }]);

	  return M5AutoTag;
	}(M5Input);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;