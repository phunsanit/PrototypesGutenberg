"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _category = _interopRequireDefault(require("./category"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockManager(_ref) {
  var search = _ref.search,
      setState = _ref.setState,
      blockTypes = _ref.blockTypes,
      categories = _ref.categories,
      hasBlockSupport = _ref.hasBlockSupport,
      isMatchingSearchTerm = _ref.isMatchingSearchTerm,
      numberOfHiddenBlocks = _ref.numberOfHiddenBlocks;
  // Filtering occurs here (as opposed to `withSelect`) to avoid wasted
  // wasted renders by consequence of `Array#filter` producing a new
  // value reference on each call.
  blockTypes = blockTypes.filter(function (blockType) {
    return hasBlockSupport(blockType, 'inserter', true) && (!search || isMatchingSearchTerm(blockType, search)) && (!blockType.parent || (0, _lodash.includes)(blockType.parent, 'core/post-content'));
  });
  return (0, _element.createElement)("div", {
    className: "edit-post-manage-blocks-modal__content"
  }, (0, _element.createElement)(_components.TextControl, {
    type: "search",
    label: (0, _i18n.__)('Search for a block'),
    value: search,
    onChange: function onChange(nextSearch) {
      return setState({
        search: nextSearch
      });
    },
    className: "edit-post-manage-blocks-modal__search"
  }), !!numberOfHiddenBlocks && (0, _element.createElement)("div", {
    className: "edit-post-manage-blocks-modal__disabled-blocks-count"
  }, (0, _i18n.sprintf)(
  /* translators: %d: number of blocks. */
  (0, _i18n._n)('%d block is disabled.', '%d blocks are disabled.', numberOfHiddenBlocks), numberOfHiddenBlocks)), (0, _element.createElement)("div", {
    tabIndex: "0",
    role: "region",
    "aria-label": (0, _i18n.__)('Available block types'),
    className: "edit-post-manage-blocks-modal__results"
  }, blockTypes.length === 0 && (0, _element.createElement)("p", {
    className: "edit-post-manage-blocks-modal__no-results"
  }, (0, _i18n.__)('No blocks found.')), categories.map(function (category) {
    return (0, _element.createElement)(_category.default, {
      key: category.slug,
      title: category.title,
      blockTypes: (0, _lodash.filter)(blockTypes, {
        category: category.slug
      })
    });
  }), (0, _element.createElement)(_category.default, {
    title: (0, _i18n.__)('Uncategorized'),
    blockTypes: (0, _lodash.filter)(blockTypes, function (_ref2) {
      var category = _ref2.category;
      return !category;
    })
  })));
}

var _default = (0, _compose.compose)([(0, _compose.withState)({
  search: ''
}), (0, _data.withSelect)(function (select) {
  var _select = select('core/blocks'),
      getBlockTypes = _select.getBlockTypes,
      getCategories = _select.getCategories,
      hasBlockSupport = _select.hasBlockSupport,
      isMatchingSearchTerm = _select.isMatchingSearchTerm;

  var _select2 = select('core/edit-post'),
      getPreference = _select2.getPreference;

  var hiddenBlockTypes = getPreference('hiddenBlockTypes');
  var numberOfHiddenBlocks = (0, _lodash.isArray)(hiddenBlockTypes) && hiddenBlockTypes.length;
  return {
    blockTypes: getBlockTypes(),
    categories: getCategories(),
    hasBlockSupport: hasBlockSupport,
    isMatchingSearchTerm: isMatchingSearchTerm,
    numberOfHiddenBlocks: numberOfHiddenBlocks
  };
})])(BlockManager);

exports.default = _default;
//# sourceMappingURL=manager.js.map