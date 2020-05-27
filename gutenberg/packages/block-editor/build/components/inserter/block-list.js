"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InserterBlockList = InserterBlockList;
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _url = require("@wordpress/url");

var _icons = require("@wordpress/icons");

var _a11y = require("@wordpress/a11y");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blockTypesList = _interopRequireDefault(require("../block-types-list"));

var _childBlocks = _interopRequireDefault(require("./child-blocks"));

var _inserterMenuExtension = _interopRequireDefault(require("../inserter-menu-extension"));

var _searchItems = require("./search-items");

var _panel = _interopRequireDefault(require("./panel"));

var _noResults = _interopRequireDefault(require("./no-results"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copied over from the Columns block. It seems like it should become part of public API.
var createBlocksFromInnerBlocksTemplate = function createBlocksFromInnerBlocksTemplate(innerBlocksTemplate) {
  return (0, _lodash.map)(innerBlocksTemplate, function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 3),
        name = _ref2[0],
        attributes = _ref2[1],
        _ref2$ = _ref2[2],
        innerBlocks = _ref2$ === void 0 ? [] : _ref2$;

    return (0, _blocks.createBlock)(name, attributes, createBlocksFromInnerBlocksTemplate(innerBlocks));
  });
};

var getBlockNamespace = function getBlockNamespace(item) {
  return item.name.split('/')[0];
};

var MAX_SUGGESTED_ITEMS = 6;

function InserterBlockList(_ref3) {
  var rootClientId = _ref3.rootClientId,
      onInsert = _ref3.onInsert,
      onHover = _ref3.onHover,
      selectBlockOnInsert = _ref3.__experimentalSelectBlockOnInsert,
      filterValue = _ref3.filterValue,
      debouncedSpeak = _ref3.debouncedSpeak;

  var _useSelect = (0, _data.useSelect)(function (select) {
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


  (0, _element.useEffect)(function () {
    if (fetchReusableBlocks) {
      fetchReusableBlocks();
    }
  }, []);

  var onSelectItem = function onSelectItem(item) {
    var name = item.name,
        title = item.title,
        initialAttributes = item.initialAttributes,
        innerBlocks = item.innerBlocks;
    var insertedBlock = (0, _blocks.createBlock)(name, initialAttributes, createBlocksFromInnerBlocksTemplate(innerBlocks));
    onInsert(insertedBlock);

    if (!selectBlockOnInsert) {
      // translators: %s: the name of the block that has been added
      var message = (0, _i18n.sprintf)((0, _i18n.__)('%s block added'), title);
      (0, _a11y.speak)(message);
    }
  };

  var filteredItems = (0, _element.useMemo)(function () {
    return (0, _searchItems.searchBlockItems)(items, categories, collections, filterValue);
  }, [filterValue, items, categories, collections]);
  var childItems = (0, _element.useMemo)(function () {
    return filteredItems.filter(function (_ref4) {
      var name = _ref4.name;
      return (0, _lodash.includes)(rootChildBlocks, name);
    });
  }, [filteredItems, rootChildBlocks]);
  var suggestedItems = (0, _element.useMemo)(function () {
    return items.slice(0, MAX_SUGGESTED_ITEMS);
  }, [items]);
  var reusableItems = (0, _element.useMemo)(function () {
    return filteredItems.filter(function (_ref5) {
      var category = _ref5.category;
      return category === 'reusable';
    });
  }, [filteredItems]);
  var uncategorizedItems = (0, _element.useMemo)(function () {
    return filteredItems.filter(function (item) {
      return !item.category;
    });
  }, [filteredItems]);
  var itemsPerCategory = (0, _element.useMemo)(function () {
    var getCategoryIndex = function getCategoryIndex(item) {
      return (0, _lodash.findIndex)(categories, function (category) {
        return category.slug === item.category;
      });
    };

    return (0, _lodash.flow)(function (itemList) {
      return itemList.filter(function (item) {
        return item.category && item.category !== 'reusable';
      });
    }, function (itemList) {
      return (0, _lodash.sortBy)(itemList, getCategoryIndex);
    }, function (itemList) {
      return (0, _lodash.groupBy)(itemList, 'category');
    })(filteredItems);
  }, [filteredItems, categories]);
  var itemsPerCollection = (0, _element.useMemo)(function () {
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

  (0, _element.useEffect)(function () {
    var resultsFoundMessage = (0, _i18n.sprintf)(
    /* translators: %d: number of results. */
    (0, _i18n._n)('%d result found.', '%d results found.', filteredItems.length), filteredItems.length);
    debouncedSpeak(resultsFoundMessage);
  }, [filterValue, debouncedSpeak]);
  var hasItems = !(0, _lodash.isEmpty)(filteredItems);
  var hasChildItems = childItems.length > 0;
  return (0, _element.createElement)("div", null, (0, _element.createElement)(_childBlocks.default, {
    rootClientId: rootClientId,
    items: childItems,
    onSelect: onSelectItem,
    onHover: onHover
  }), !hasChildItems && !!suggestedItems.length && !filterValue && (0, _element.createElement)(_panel.default, {
    title: (0, _i18n._x)('Most used', 'blocks')
  }, (0, _element.createElement)(_blockTypesList.default, {
    items: suggestedItems,
    onSelect: onSelectItem,
    onHover: onHover
  })), !hasChildItems && (0, _lodash.map)(categories, function (category) {
    var categoryItems = itemsPerCategory[category.slug];

    if (!categoryItems || !categoryItems.length) {
      return null;
    }

    return (0, _element.createElement)(_panel.default, {
      key: category.slug,
      title: category.title,
      icon: category.icon
    }, (0, _element.createElement)(_blockTypesList.default, {
      items: categoryItems,
      onSelect: onSelectItem,
      onHover: onHover
    }));
  }), !hasChildItems && !!uncategorizedItems.length && (0, _element.createElement)(_panel.default, {
    className: "block-editor-inserter__uncategorized-blocks-panel",
    title: (0, _i18n.__)('Uncategorized')
  }, (0, _element.createElement)(_blockTypesList.default, {
    items: uncategorizedItems,
    onSelect: onSelectItem,
    onHover: onHover
  })), !hasChildItems && (0, _lodash.map)(collections, function (collection, namespace) {
    var collectionItems = itemsPerCollection[namespace];

    if (!collectionItems || !collectionItems.length) {
      return null;
    }

    return (0, _element.createElement)(_panel.default, {
      key: namespace,
      title: collection.title,
      icon: collection.icon
    }, (0, _element.createElement)(_blockTypesList.default, {
      items: collectionItems,
      onSelect: onSelectItem,
      onHover: onHover
    }));
  }), !hasChildItems && !!reusableItems.length && (0, _element.createElement)(_panel.default, {
    className: "block-editor-inserter__reusable-blocks-panel",
    title: (0, _i18n.__)('Reusable'),
    icon: _icons.controlsRepeat
  }, (0, _element.createElement)(_blockTypesList.default, {
    items: reusableItems,
    onSelect: onSelectItem,
    onHover: onHover
  }), (0, _element.createElement)("a", {
    className: "block-editor-inserter__manage-reusable-blocks",
    href: (0, _url.addQueryArgs)('edit.php', {
      post_type: 'wp_block'
    })
  }, (0, _i18n.__)('Manage all reusable blocks'))), (0, _element.createElement)(_inserterMenuExtension.default.Slot, {
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
      return (0, _element.createElement)(_noResults.default, null);
    }

    return null;
  }));
}

var _default = (0, _compose.compose)(_components.withSpokenMessages)(InserterBlockList);

exports.default = _default;
//# sourceMappingURL=block-list.js.map