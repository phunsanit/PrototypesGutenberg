"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _keycodes = require("@wordpress/keycodes");

var _i18n = require("@wordpress/i18n");

var _blockPreview = _interopRequireDefault(require("../block-preview"));

var _useAsyncList = _interopRequireDefault(require("./use-async-list"));

var _panel = _interopRequireDefault(require("./panel"));

var _searchItems = require("./search-items");

var _noResults = _interopRequireDefault(require("./no-results"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var usePatternsState = function usePatternsState(onInsert) {
  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select$getSettings = select('core/block-editor').getSettings(),
        __experimentalBlockPatterns = _select$getSettings.__experimentalBlockPatterns,
        __experimentalBlockPatternCategories = _select$getSettings.__experimentalBlockPatternCategories;

    return {
      patterns: __experimentalBlockPatterns,
      patternCategories: __experimentalBlockPatternCategories
    };
  }, []),
      patternCategories = _useSelect.patternCategories,
      patterns = _useSelect.patterns;

  var _useDispatch = (0, _data.useDispatch)('core/notices'),
      createSuccessNotice = _useDispatch.createSuccessNotice;

  var onClickPattern = (0, _element.useCallback)(function (pattern, blocks) {
    onInsert((0, _lodash.map)(blocks, function (block) {
      return (0, _blocks.cloneBlock)(block);
    }));
    createSuccessNotice((0, _i18n.sprintf)(
    /* translators: %s: block pattern title. */
    (0, _i18n.__)('Pattern "%s" inserted.'), pattern.title), {
      type: 'snackbar'
    });
  }, []);
  return [patterns, patternCategories, onClickPattern];
};

function BlockPattern(_ref) {
  var pattern = _ref.pattern,
      _onClick = _ref.onClick;
  var content = pattern.content,
      viewportWidth = pattern.viewportWidth;
  var blocks = (0, _element.useMemo)(function () {
    return (0, _blocks.parse)(content);
  }, [content]);
  return (0, _element.createElement)("div", {
    className: "block-editor-inserter__patterns-item",
    role: "button",
    onClick: function onClick() {
      return _onClick(pattern, blocks);
    },
    onKeyDown: function onKeyDown(event) {
      if (_keycodes.ENTER === event.keyCode || _keycodes.SPACE === event.keyCode) {
        _onClick(pattern, blocks);
      }
    },
    tabIndex: 0,
    "aria-label": pattern.title
  }, (0, _element.createElement)(_blockPreview.default, {
    blocks: blocks,
    viewportWidth: viewportWidth
  }), (0, _element.createElement)("div", {
    className: "block-editor-inserter__patterns-item-title"
  }, pattern.title));
}

function BlockPatternPlaceholder() {
  return (0, _element.createElement)("div", {
    className: "block-editor-inserter__patterns-item is-placeholder"
  });
}

function BlockPatternList(_ref2) {
  var patterns = _ref2.patterns,
      shownPatterns = _ref2.shownPatterns,
      onClickPattern = _ref2.onClickPattern;
  return patterns.map(function (pattern) {
    var isShown = shownPatterns.includes(pattern);
    return isShown ? (0, _element.createElement)(BlockPattern, {
      key: pattern.name,
      pattern: pattern,
      onClick: onClickPattern
    }) : (0, _element.createElement)(BlockPatternPlaceholder, {
      key: pattern.name
    });
  });
}

function BlockPatternsSearchResults(_ref3) {
  var filterValue = _ref3.filterValue,
      onInsert = _ref3.onInsert;

  var _usePatternsState = usePatternsState(onInsert),
      _usePatternsState2 = (0, _slicedToArray2.default)(_usePatternsState, 3),
      patterns = _usePatternsState2[0],
      onClick = _usePatternsState2[2];

  var currentShownPatterns = (0, _useAsyncList.default)(patterns);
  var filteredPatterns = (0, _element.useMemo)(function () {
    return (0, _searchItems.searchItems)(patterns, filterValue);
  }, [filterValue, patterns]);

  if (filterValue) {
    return !!filteredPatterns.length ? (0, _element.createElement)(_panel.default, {
      title: (0, _i18n.__)('Search Results')
    }, (0, _element.createElement)(BlockPatternList, {
      shownPatterns: currentShownPatterns,
      patterns: filteredPatterns,
      onClickPattern: onClick
    })) : (0, _element.createElement)(_noResults.default, null);
  }
}

function BlockPatternsPerCategories(_ref4) {
  var onInsert = _ref4.onInsert;

  var _usePatternsState3 = usePatternsState(onInsert),
      _usePatternsState4 = (0, _slicedToArray2.default)(_usePatternsState3, 3),
      patterns = _usePatternsState4[0],
      categories = _usePatternsState4[1],
      onClick = _usePatternsState4[2];

  var getPatternIndex = (0, _element.useCallback)(function (pattern) {
    if (!pattern.categories || !pattern.categories.length) {
      return Infinity;
    }

    var indexedCategories = (0, _lodash.fromPairs)(categories.map(function (_ref5, index) {
      var name = _ref5.name;
      return [name, index];
    }));
    return Math.min.apply(Math, (0, _toConsumableArray2.default)(pattern.categories.map(function (category) {
      return indexedCategories[category] !== undefined ? indexedCategories[category] : Infinity;
    })));
  }, [categories]); // Ordering the patterns per category is important for the async rendering.

  var orderedPatterns = (0, _element.useMemo)(function () {
    return patterns.sort(function (a, b) {
      return getPatternIndex(a) - getPatternIndex(b);
    });
  }, [patterns, getPatternIndex]);
  var currentShownPatterns = (0, _useAsyncList.default)(orderedPatterns); // Uncategorized Patterns

  var uncategorizedPatterns = (0, _element.useMemo)(function () {
    return patterns.filter(function (pattern) {
      return getPatternIndex(pattern) === Infinity;
    });
  }, [patterns, getPatternIndex]);
  return (0, _element.createElement)(_element.Fragment, null, categories.map(function (patternCategory) {
    var categoryPatterns = patterns.filter(function (pattern) {
      return pattern.categories && pattern.categories.includes(patternCategory.name);
    });
    return !!categoryPatterns.length && (0, _element.createElement)(_panel.default, {
      key: patternCategory.name,
      title: patternCategory.label
    }, (0, _element.createElement)(BlockPatternList, {
      shownPatterns: currentShownPatterns,
      patterns: categoryPatterns,
      onClickPattern: onClick
    }));
  }), !!uncategorizedPatterns.length && (0, _element.createElement)(_panel.default, {
    title: (0, _i18n._x)('Uncategorized')
  }, (0, _element.createElement)(BlockPatternList, {
    shownPatterns: currentShownPatterns,
    patterns: uncategorizedPatterns,
    onClickPattern: onClick
  })));
}

function BlockPatterns(_ref6) {
  var onInsert = _ref6.onInsert,
      filterValue = _ref6.filterValue;
  return filterValue ? (0, _element.createElement)(BlockPatternsSearchResults, {
    onInsert: onInsert,
    filterValue: filterValue
  }) : (0, _element.createElement)(BlockPatternsPerCategories, {
    onInsert: onInsert
  });
}

var _default = BlockPatterns;
exports.default = _default;
//# sourceMappingURL=block-patterns.js.map