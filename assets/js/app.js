/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports) {

	'use strict';

	var hidePageComponents = true;

	document.querySelector('html').classList.remove('no-js');
	document.querySelector('html').classList.add('js');

	//document.querySelector('html').setAttribute('complex-layout', true);

	//document.querySelector('html').setAttribute('contrast', 'white-on-black');
	//document.querySelector('html').setAttribute('contrast', 'black-on-white');
	//document.querySelector('html').removeAttribute('contrast');

	//document.body.classList.add('searching');
	//document.body.classList.add('snappy');

	var radios = document.querySelectorAll('input[type="radio"]');
	for (var i = 0; i < radios.length; i++) {
	  var radio = radios[i];
	  radio.addEventListener('change', function (event) {
	    hidePageComponents = event.target.value == 1 ? true : false;
	    //doFilterPageComponents(hidePageComponents);
	    hidePageComponents ? document.querySelector('html').classList.add('hide-unmatched-elements') : document.querySelector('html').classList.remove('hide-unmatched-elements');
	  });
	}

	(function () {
	  var viewBtns = document.querySelectorAll('.actionnav .view');
	  for (var _i = 0; _i < viewBtns.length; _i++) {
	    var viewBtn = viewBtns[_i];
	    viewBtn.addEventListener('click', function (event) {
	      event.preventDefault();
	      document.body.dataset.previewing = document.body.dataset.previewing == 'true' ? 'false' : 'true';
	    });
	  }
	})();

	(function () {
	  function expandCollapseAllDetails() {
	    var open = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    var details = document.querySelectorAll('details');
	    for (var _i2 = 0; _i2 < details.length; _i2++) {
	      open ? details[_i2].setAttribute('open', 'true') : details[_i2].removeAttribute('open');
	    }
	  }
	  document.addEventListener("keydown", function (event) {
	    console.log(event, event.key.toLowerCase());
	    switch (event.key.toLowerCase()) {
	      case 'arrowdown':
	        if (event.ctrlKey && event.altKey && event.shiftKey) expandCollapseAllDetails(true);

	        break;

	      case 'arrowup':
	        if (event.ctrlKey && event.altKey && event.shiftKey) expandCollapseAllDetails(false);
	        break;
	    }
	  });
	})();

	document.getElementById('jumplink').outerHTML = '\n<label for="jumpto" visually-hidden>Jump to a section of hte page</label>\n<select name="jumpto" id="jumpto">\n  <option value="" aria-label="Choose a section to scroll to">Scroll to&hellip;</option>\n  <optgroup label="Content">\n    <option value="#content">Content</option>\n    <option value="#document">Document</option>\n    <option value="#resources">Resources</option>\n    <option value="#resource-groups">Resource Groups</option>\n    <option value="#settings">Settings</option>\n  </optgroup>\n  <optgroup label="Code">\n    <option value="#elements">Elements</option>\n    <option value="#template-variables">Template Variables</option>\n  </optgroup>\n  <optgroup label="Navigation">\n    <option value="#mainnav__nav" data-above-sticky-bar="true">Main Navigation</option>\n  </optgroup>\n</select>\n';

	document.getElementById('jumpto').addEventListener('change', function (event) {
	  /*document.querySelector(event.target.value).scrollIntoView({ // works but sticky bar covers up what we scroll to :/
	    behavior: 'smooth'
	  });*/

	  console.log(event.target.value);

	  if (!event.target.value) return;

	  //https://davidwalsh.name/element-matches-selector

	  if (document.querySelector(event.target.value).matches('details')) {
	    document.querySelector(event.target.value).setAttribute('open', true);
	  }

	  var offset = 0;
	  if (event.target.querySelector('option[value="' + event.target.value + '"]').dataset.aboveStickyBar !== "true") {
	    offset = document.getElementById('stickybar').offsetHeight + 4;
	  }

	  console.log(document.querySelector(event.target.value).getBoundingClientRect());
	  window.scrollBy({
	    top: document.querySelector(event.target.value).getBoundingClientRect().top - offset,
	    //left: 0,
	    behavior: 'smooth'
	  });
	});

	document.querySelector('.sidenav > footer a').addEventListener('click', function (event) {
	  event.preventDefault();
	  document.body.classList.remove('searching');
	  mainNavDetailsOpen(false);
	});

	(function () {
	  var stickyComponents = document.querySelectorAll('.sticky-scroll');
	  for (var _i3 = 0; _i3 < stickyComponents.length; _i3++) {
	    stickyComponents[_i3].querySelector('input[name*="snap-scroll"]').addEventListener('change', function (event) {
	      event.target.checked ? document.body.classList.add('snappy') : document.body.classList.remove('snappy');
	      var stickyBoxes = document.querySelectorAll('input[name*="snap-scroll"]');
	      for (var _i4 = 0; _i4 < stickyBoxes.length; _i4++) {
	        stickyBoxes[_i4].checked = event.target.checked;
	      }
	    });
	  }
	})();

	(function () {
	  var emojis = document.querySelectorAll('span[emoji]');

	  var _loop = function _loop(_i5) {

	    var emoji = emojis[_i5],
	        props = {
	      iconset: emoji.getAttribute('data-iconset'),
	      icon: emoji.getAttribute('data-icon'),
	      svgClass: emoji.getAttribute('data-svg-class'),
	      svgTitle: emoji.getAttribute('data-svg-title')
	    },
	        sprite = undefined;

	    (function () {
	      //console.log(emoji);
	      //console.log(props);

	      if (!props.icon) return;

	      if (!sprite) {
	        switch (props.iconset) {
	          case 'svgawesome':
	            sprite = 'assets/img/icons.svg';
	            break;
	        }
	      }

	      var svgClass = props.svgClass ? ' class="' + props.svgClass + '"' : undefined,
	          xlinkHref = sprite + '#' + props.icon,
	          html = '<svg' + svgClass + '>\n        <use xlink:href="' + xlinkHref + '"></use>\n      </svg>';

	      emoji.outerHTML = html;
	    })();
	  };

	  for (var _i5 = 0; _i5 < emojis.length; _i5++) {
	    _loop(_i5);
	  }
	})();

	document.getElementById('pagetitle').addEventListener('input', function (event) {
	  document.querySelector('#grail > main > form > header > h1').innerHTML = event.target.value || '&nbsp;';
	  document.querySelector('html > head > title').innerHTML = 'Editing ' + event.target.value;
	});

	document.getElementById('ubersearch').addEventListener('input', function (event) {
	  if (event.target.value) event.target.classList.add('dirty');
	  if (hidePageComponents) {
	    doFilterPageComponents(event.target.value);
	  }
	});

	function mainNavDetailsOpen() {
	  var open = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	  var details = document.querySelectorAll('#mainnav__nav > details');
	  for (var _i6 = 0; _i6 < details.length; _i6++) {
	    var detail = details[_i6];
	    open ? detail.setAttribute('open', true) : detail.removeAttribute('open');
	  }
	}

	document.getElementById('ubersearch').addEventListener('focus', function (event) {
	  if (event.target.value) event.target.classList.add('dirty');
	  document.body.classList.add('searching');
	  mainNavDetailsOpen(true);
	});

	document.getElementById('ubersearch').addEventListener('blur', function (event) {
	  if (!event.target.value) event.target.classList.remove('dirty');
	  //document.body.classList.remove('searching');
	  //mainNavDetailsOpen(false);
	});

	function doFilterPageComponents(filter) {
	  filter = filter.trim().toLowerCase();

	  var filterWords = filter.split(' ');

	  var pageComponents = document.querySelectorAll('#mainnav__nav li');

	  var _loop2 = function _loop2(_i7) {
	    var pageComponent = pageComponents[_i7];

	    var match = function () {
	      var found = false;

	      for (var _i8 = 0; _i8 < filterWords.length; _i8++) {
	        var filterWord = filterWords[_i8];

	        try {
	          if (pageComponent.querySelector('h3 > a').innerHTML.toLowerCase().includes(filterWord) || pageComponent.querySelector('p').innerHTML.toLowerCase().includes(filterWord)) {
	            //console.log('match');
	            return true;
	          }
	        } catch (e) {}
	      }

	      return found;
	    }();

	    if (!match && filter) {
	      pageComponent.setAttribute('hidden', 'true');
	      pageComponent.setAttribute('aria-hidden', 'true');
	    } else {
	      pageComponent.removeAttribute('hidden');
	      pageComponent.removeAttribute('aria-hidden');
	    }
	  };

	  for (var _i7 = 0; _i7 < pageComponents.length; _i7++) {
	    _loop2(_i7);
	  }
	}

	/*
	const ubersearch = document.querySelector('#ubersearch');
	ubersearch.addEventListener('blur', (event) => {
	  console.log(event);
	});

	ubersearch.addEventListener('focus', (event) => {
	  console.log(event);
	});
	*/

/***/ }
/******/ ]);