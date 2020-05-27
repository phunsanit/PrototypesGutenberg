import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { map, includes, findIndex, flow, sortBy, groupBy, isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _x, _n, sprintf } from '@wordpress/i18n';
import { withSpokenMessages } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';
import { controlsRepeat } from '@wordpress/icons';
import { speak } from '@wordpress/a11y';
import { createBlock } from '@wordpress/blocks';
import { useMemo, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockTypesList from '../block-types-list';
import ChildBlocks from './child-blocks';
import __experimentalInserterMenuExtension from '../inserter-menu-extension';
import { searchBlockItems } from './search-items';
import InserterPanel from './panel';
import InserterNoResults from './no-results'; // Copied over from the Columns block. It seems like it should become part of public API.

var createBlocksFromInnerBlocksTemplate = function createBlocksFromInnerBlocksTemplate(innerBlocksTemplate) {
  return map(innerBlocksTemplate, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        name = _ref2[0],
        attributes = _ref2[1],
        _ref2$ = _ref2[2],
        innerBlocks = _ref2$ === void 0 ? [] : _ref2$;

    return createBlock(name, attributes, createBlocksFromInnerBlocksTemplate(innerBlocks));
  });
};

var getBlockNamespace = function getBlockNamespace(item) {
  return item.name.split('/')[0];
};

var MAX_SUGGESTED_ITEMS = 6;
export function InserterBlockList(_ref3) {
  var rootClientId = _ref3.rootClientId,
      onInsert = _ref3.onInsert,
      onHover = _ref3.onHover,
      selectBlockOnInsert = _ref3.__experimentalSelectBlockOnInsert,
      filterValue = _ref3.filterValue,
      debouncedSpeak = _ref3.debouncedSpeak;

  var _useSelect = useSelect(function (select) {
    var _select = select('core/block-editor'),
        getInserterItems = _select.getInserterItems,
        getBlockName = _select.getBlockName,
        getSettings = _select.getSettings;

    var _select2 = select('core/blocks'),
        getCategories = _select2.getCategories,
        getCollections = _select2.getCollections,
        getChildBlockNames = _select2.getChildBlockNames;

    var rootBlockName = getBlockName(rootClientId);

    var _getSettings = getSettings(),
        __experimentalFetchReusableBlocks = _getSettings.__experimentalFetchReusableBlocks;

    return {
      categories: getCategories(),
      collections: getCollections(),
      rootChildBlocks: getChildBlockNames(rootBlockName),
      items: getInserterItems(rootClientId),
      fetchReusableBlocks: __experimentalFetchReusableBlocks
    };
  }, [rootClientId]),
      categories = _useSelect.categories,
      collections = _useSelect.collections,
      items = _useSelect.items,
      rootChildBlocks = _useSelect.rootChildBlocks,
      fetchReusableBlocks = _useSelect.fetchReusableBlocks; // Fetch resuable blocks on mount


  useEffect(function () {
    if (fetchReusableBlocks) {
      fetchReusableBlocks();
    }
  }, []);

  var onSelectItem = function onSelectItem(item) {
    var name = item.name,
        title = item.title,
        initialAttributes = item.initialAttributes,
        innerBlocks = item.innerBlocks;
    var insertedBlock = createBlock(name, initialAttributes, createBlocksFromInnerBlocksTemplate(innerBlocks));
    onInsert(insertedBlock);

    if (!selectBlockOnInsert) {
      // translators: %s: the name of the block that has been added
      var message = sprintf(__('%s block added'), title);
      speak(message);
    }
  };

  var filteredItems = useMemo(function () {
    return searchBlockItems(items, categories, collections, filterValue);
  }, [filterValue, items, categories, collections]);
  var childItems = useMemo(function () {
    return filteredItems.filter(function (_ref4) {
      var name = _ref4.name;
      return includes(rootChildBlocks, name);
    });
  }, [filteredItems, rootChildBlocks]);
  var suggestedItems = useMemo(function () {
    return items.slice(0, MAX_SUGGESTED_ITEMS);
  }, [items]);
  var reusableItems = useMemo(function () {
    return filteredItems.filter(function (_ref5) {
      var category = _ref5.category;
      return category === 'reusable';
    });
  }, [filteredItems]);
  var uncategorizedItems = useMemo(function () {
    return filteredItems.filter(function (item) {
      return !item.category;
    });
  }, [filteredItems]);
  var itemsPerCategory = useMemo(function () {
    var getCategoryIndex = function getCategoryIndex(item) {
      return findIndex(categories, function (category) {
        return category.slug === item.category;
      });
    };

    return flow(function (itemList) {
      return itemList.filter(function (item) {
        return item.category && item.category !== 'reusable';
      });
    }, function (itemList) {
      return sortBy(itemList, getCategoryIndex);
    }, function (itemList) {
      return groupBy(itemList, 'category');
    })(filteredItems);
  }, [filteredItems, categories]);
  var itemsPerCollection = useMemo(function () {
    // Create a new Object to avoid mutating collection
    var result = _objectSpread({}, collections);

    Object.keys(collections).forEach(function (namespace) {
      result[namespace] = filteredItems.filter(function (item) {
        return getBlockNamespace(item) === namespace;
      });

      if (result[namespace].length === 0) {
        delete result[namespace];
      }
    });
    return result;
  }, [filteredItems, collections]); // Announce search results on change

  useEffect(function () {
    var resultsFoundMessage = sprintf(
    /* translators: %d: number of results. */
    _n('%d result found.', '%d results found.', filteredItems.length), filteredItems.length);
    debouncedSpeak(resultsFoundMessage);
  }, [filterValue, debouncedSpeak]);
  var hasItems = !isEmpty(filteredItems);
  var hasChildItems = childItems.length > 0;
  return createElement("div", null, createElement(ChildBlocks, {
    rootClientId: rootClientId,
    items: childItems,
    onSelect: onSelectItem,
    onHover: onHover
  }), !hasChildItems && !!suggestedItems.length && !filterValue && createElement(InserterPanel, {
    title: _x('Most used', 'blocks')
  }, createElement(BlockTypesList, {
    items: suggestedItems,
    onSelect: onSelectItem,
    onHover: onHover
  })), !hasChildItems && map(categories, function (category) {
    var categoryItems = itemsPerCategory[category.slug];

    if (!categoryItems || !categoryItems.length) {
      return null;
    }

    return createElement(InserterPanel, {
      key: category.slug,
      title: category.title,
      icon: category.icon
    }, createElement(BlockTypesList, {
      items: categoryItems,
      onSelect: onSelectItem,
      onHover: onHover
    }));
  }), !hasChildItems && !!uncategorizedItems.length && createElement(InserterPanel, {
    className: "block-editor-inserter__uncategorized-blocks-panel",
    title: __('Uncategorized')
  }, createElement(BlockTypesList, {
    items: uncategorizedItems,
    onSelect: onSelectItem,
    onHover: onHover
  })), !hasChildItems && map(collections, function (collection, namespace) {
    var collectionItems = itemsPerCollection[namespace];

    if (!collectionItems || !collectionItems.length) {
      return null;
    }

    return createElement(InserterPanel, {
      key: namespace,
      title: collection.title,
      icon: collection.icon
    }, createElement(BlockTypesList, {
      items: collectionItems,
      onSelect: onSelectItem,
      onHover: onHover
    }));
  }), !hasChildItems && !!reusableItems.length && createElement(InserterPanel, {
    className: "block-editor-inserter__reusable-blocks-panel",
    title: __('Reusable'),
    icon: controlsRepeat
  }, createElement(BlockTypesList, {
    items: reusableItems,
    onSelect: onSelectItem,
    onHover: onHover
  }), createElement("a", {
    className: "block-editor-inserter__manage-reusable-blocks",
    href: addQueryArgs('edit.php', {
      post_type: 'wp_block'
    })
  }, __('Manage all reusable blocks'))), createElement(__experimentalInserterMenuExtension.Slot, {
    fillProps: {
      onSelect: onSelectItem,
      onHover: onHover,
      filterValue: filterValue,
      hasItems: hasItems
    }
  }, function (fills) {
    if (fills.length) {
      return fills;
    }

    if (!hasItems) {
      return createElement(InserterNoResults, null);
    }

    return null;
  }));
}
export default compose(withSpokenMessages)(InserterBlockList);
//# sourceMappingURL=block-list.js.map