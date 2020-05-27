import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { filter, includes, isArray } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
import { compose, withState } from '@wordpress/compose';
import { TextControl } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import BlockManagerCategory from './category';

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
    return hasBlockSupport(blockType, 'inserter', true) && (!search || isMatchingSearchTerm(blockType, search)) && (!blockType.parent || includes(blockType.parent, 'core/post-content'));
  });
  return createElement("div", {
    className: "edit-post-manage-blocks-modal__content"
  }, createElement(TextControl, {
    type: "search",
    label: __('Search for a block'),
    value: search,
    onChange: function onChange(nextSearch) {
      return setState({
        search: nextSearch
      });
    },
    className: "edit-post-manage-blocks-modal__search"
  }), !!numberOfHiddenBlocks && createElement("div", {
    className: "edit-post-manage-blocks-modal__disabled-blocks-count"
  }, sprintf(
  /* translators: %d: number of blocks. */
  _n('%d block is disabled.', '%d blocks are disabled.', numberOfHiddenBlocks), numberOfHiddenBlocks)), createElement("div", {
    tabIndex: "0",
    role: "region",
    "aria-label": __('Available block types'),
    className: "edit-post-manage-blocks-modal__results"
  }, blockTypes.length === 0 && createElement("p", {
    className: "edit-post-manage-blocks-modal__no-results"
  }, __('No blocks found.')), categories.map(function (category) {
    return createElement(BlockManagerCategory, {
      key: category.slug,
      title: category.title,
      blockTypes: filter(blockTypes, {
        category: category.slug
      })
    });
  }), createElement(BlockManagerCategory, {
    title: __('Uncategorized'),
    blockTypes: filter(blockTypes, function (_ref2) {
      var category = _ref2.category;
      return !category;
    })
  })));
}

export default compose([withState({
  search: ''
}), withSelect(function (select) {
  var _select = select('core/blocks'),
      getBlockTypes = _select.getBlockTypes,
      getCategories = _select.getCategories,
      hasBlockSupport = _select.hasBlockSupport,
      isMatchingSearchTerm = _select.isMatchingSearchTerm;

  var _select2 = select('core/edit-post'),
      getPreference = _select2.getPreference;

  var hiddenBlockTypes = getPreference('hiddenBlockTypes');
  var numberOfHiddenBlocks = isArray(hiddenBlockTypes) && hiddenBlockTypes.length;
  return {
    blockTypes: getBlockTypes(),
    categories: getCategories(),
    hasBlockSupport: hasBlockSupport,
    isMatchingSearchTerm: isMatchingSearchTerm,
    numberOfHiddenBlocks: numberOfHiddenBlocks
  };
})])(BlockManager);
//# sourceMappingURL=manager.js.map