import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { map, fromPairs } from 'lodash';
/**
 * WordPress dependencies
 */

import { useMemo, useCallback } from '@wordpress/element';
import { parse, cloneBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { __, sprintf, _x } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import BlockPreview from '../block-preview';
import useAsyncList from './use-async-list';
import InserterPanel from './panel';
import { searchItems } from './search-items';
import InserterNoResults from './no-results';

var usePatternsState = function usePatternsState(onInsert) {
  var _useSelect = useSelect(function (select) {
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

  var _useDispatch = useDispatch('core/notices'),
      createSuccessNotice = _useDispatch.createSuccessNotice;

  var onClickPattern = useCallback(function (pattern, blocks) {
    onInsert(map(blocks, function (block) {
      return cloneBlock(block);
    }));
    createSuccessNotice(sprintf(
    /* translators: %s: block pattern title. */
    __('Pattern "%s" inserted.'), pattern.title), {
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
  var blocks = useMemo(function () {
    return parse(content);
  }, [content]);
  return createElement("div", {
    className: "block-editor-inserter__patterns-item",
    role: "button",
    onClick: function onClick() {
      return _onClick(pattern, blocks);
    },
    onKeyDown: function onKeyDown(event) {
      if (ENTER === event.keyCode || SPACE === event.keyCode) {
        _onClick(pattern, blocks);
      }
    },
    tabIndex: 0,
    "aria-label": pattern.title
  }, createElement(BlockPreview, {
    blocks: blocks,
    viewportWidth: viewportWidth
  }), createElement("div", {
    className: "block-editor-inserter__patterns-item-title"
  }, pattern.title));
}

function BlockPatternPlaceholder() {
  return createElement("div", {
    className: "block-editor-inserter__patterns-item is-placeholder"
  });
}

function BlockPatternList(_ref2) {
  var patterns = _ref2.patterns,
      shownPatterns = _ref2.shownPatterns,
      onClickPattern = _ref2.onClickPattern;
  return patterns.map(function (pattern) {
    var isShown = shownPatterns.includes(pattern);
    return isShown ? createElement(BlockPattern, {
      key: pattern.name,
      pattern: pattern,
      onClick: onClickPattern
    }) : createElement(BlockPatternPlaceholder, {
      key: pattern.name
    });
  });
}

function BlockPatternsSearchResults(_ref3) {
  var filterValue = _ref3.filterValue,
      onInsert = _ref3.onInsert;

  var _usePatternsState = usePatternsState(onInsert),
      _usePatternsState2 = _slicedToArray(_usePatternsState, 3),
      patterns = _usePatternsState2[0],
      onClick = _usePatternsState2[2];

  var currentShownPatterns = useAsyncList(patterns);
  var filteredPatterns = useMemo(function () {
    return searchItems(patterns, filterValue);
  }, [filterValue, patterns]);

  if (filterValue) {
    return !!filteredPatterns.length ? createElement(InserterPanel, {
      title: __('Search Results')
    }, createElement(BlockPatternList, {
      shownPatterns: currentShownPatterns,
      patterns: filteredPatterns,
      onClickPattern: onClick
    })) : createElement(InserterNoResults, null);
  }
}

function BlockPatternsPerCategories(_ref4) {
  var onInsert = _ref4.onInsert;

  var _usePatternsState3 = usePatternsState(onInsert),
      _usePatternsState4 = _slicedToArray(_usePatternsState3, 3),
      patterns = _usePatternsState4[0],
      categories = _usePatternsState4[1],
      onClick = _usePatternsState4[2];

  var getPatternIndex = useCallback(function (pattern) {
    if (!pattern.categories || !pattern.categories.length) {
      return Infinity;
    }

    var indexedCategories = fromPairs(categories.map(function (_ref5, index) {
      var name = _ref5.name;
      return [name, index];
    }));
    return Math.min.apply(Math, _toConsumableArray(pattern.categories.map(function (category) {
      return indexedCategories[category] !== undefined ? indexedCategories[category] : Infinity;
    })));
  }, [categories]); // Ordering the patterns per category is important for the async rendering.

  var orderedPatterns = useMemo(function () {
    return patterns.sort(function (a, b) {
      return getPatternIndex(a) - getPatternIndex(b);
    });
  }, [patterns, getPatternIndex]);
  var currentShownPatterns = useAsyncList(orderedPatterns); // Uncategorized Patterns

  var uncategorizedPatterns = useMemo(function () {
    return patterns.filter(function (pattern) {
      return getPatternIndex(pattern) === Infinity;
    });
  }, [patterns, getPatternIndex]);
  return createElement(Fragment, null, categories.map(function (patternCategory) {
    var categoryPatterns = patterns.filter(function (pattern) {
      return pattern.categories && pattern.categories.includes(patternCategory.name);
    });
    return !!categoryPatterns.length && createElement(InserterPanel, {
      key: patternCategory.name,
      title: patternCategory.label
    }, createElement(BlockPatternList, {
      shownPatterns: currentShownPatterns,
      patterns: categoryPatterns,
      onClickPattern: onClick
    }));
  }), !!uncategorizedPatterns.length && createElement(InserterPanel, {
    title: _x('Uncategorized')
  }, createElement(BlockPatternList, {
    shownPatterns: currentShownPatterns,
    patterns: uncategorizedPatterns,
    onClickPattern: onClick
  })));
}

function BlockPatterns(_ref6) {
  var onInsert = _ref6.onInsert,
      filterValue = _ref6.filterValue;
  return filterValue ? createElement(BlockPatternsSearchResults, {
    onInsert: onInsert,
    filterValue: filterValue
  }) : createElement(BlockPatternsPerCategories, {
    onInsert: onInsert
  });
}

export default BlockPatterns;
//# sourceMappingURL=block-patterns.js.map