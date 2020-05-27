"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _keycodes = require("@wordpress/keycodes");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

var _tips = _interopRequireDefault(require("./tips"));

var _searchForm = _interopRequireDefault(require("./search-form"));

var _previewPanel = _interopRequireDefault(require("./preview-panel"));

var _blockList = _interopRequireDefault(require("./block-list"));

var _blockPatterns = _interopRequireDefault(require("./block-patterns"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var stopKeyPropagation = function stopKeyPropagation(event) {
  return event.stopPropagation();
};

function InserterMenu(_ref) {
  var rootClientId = _ref.rootClientId,
      clientId = _ref.clientId,
      isAppender = _ref.isAppender,
      __experimentalSelectBlockOnInsert = _ref.__experimentalSelectBlockOnInsert,
      onSelect = _ref.onSelect,
      showInserterHelpPanel = _ref.showInserterHelpPanel;

  var _useState = (0, _element.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      filterValue = _useState2[0],
      setFilterValue = _useState2[1];

  var _useState3 = (0, _element.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      hoveredItem = _useState4[0],
      setHoveredItem = _useState4[1];

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _getSettings$__experi;

    var _select = select('core/block-editor'),
        getSettings = _select.getSettings,
        getBlockRootClientId = _select.getBlockRootClientId,
        _getBlockSelectionEnd = _select.getBlockSelectionEnd;

    var destRootClientId = rootClientId;

    if (!destRootClientId && !clientId && !isAppender) {
      var end = _getBlockSelectionEnd();

      if (end) {
        destRootClientId = getBlockRootClientId(end) || undefined;
      }
    }

    return _objectSpread({
      hasPatterns: !!((_getSettings$__experi = getSettings().__experimentalBlockPatterns) === null || _getSettings$__experi === void 0 ? void 0 : _getSettings$__experi.length),
      destinationRootClientId: destRootClientId
    }, (0, _lodash.pick)(select('core/block-editor'), ['getSelectedBlock', 'getBlockIndex', 'getBlockSelectionEnd', 'getBlockOrder']));
  }, [isAppender, clientId, rootClientId]),
      destinationRootClientId = _useSelect.destinationRootClientId,
      hasPatterns = _useSelect.hasPatterns,
      getSelectedBlock = _useSelect.getSelectedBlock,
      getBlockIndex = _useSelect.getBlockIndex,
      getBlockSelectionEnd = _useSelect.getBlockSelectionEnd,
      getBlockOrder = _useSelect.getBlockOrder;

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      replaceBlocks = _useDispatch.replaceBlocks,
      insertBlocks = _useDispatch.insertBlocks,
      showInsertionPoint = _useDispatch.showInsertionPoint,
      hideInsertionPoint = _useDispatch.hideInsertionPoint;

  var showPatterns = !destinationRootClientId && hasPatterns;

  var onKeyDown = function onKeyDown(event) {
    if ((0, _lodash.includes)([_keycodes.LEFT, _keycodes.DOWN, _keycodes.RIGHT, _keycodes.UP, _keycodes.BACKSPACE, _keycodes.ENTER], event.keyCode)) {
      // Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
      event.stopPropagation();
    }
  }; // To avoid duplication, getInsertionIndex is extracted and used in two event handlers
  // This breaks the withDispatch not containing any logic rule.
  // Since it's a function only called when the event handlers are called,
  // it's fine to extract it.
  // eslint-disable-next-line no-restricted-syntax


  function getInsertionIndex() {
    // If the clientId is defined, we insert at the position of the block.
    if (clientId) {
      return getBlockIndex(clientId, destinationRootClientId);
    } // If there a selected block, we insert after the selected block.


    var end = getBlockSelectionEnd();

    if (!isAppender && end) {
      return getBlockIndex(end, destinationRootClientId) + 1;
    } // Otherwise, we insert at the end of the current rootClientId


    return getBlockOrder(destinationRootClientId).length;
  }

  var onInsertBlocks = function onInsertBlocks(blocks) {
    var selectedBlock = getSelectedBlock();

    if (!isAppender && selectedBlock && (0, _blocks.isUnmodifiedDefaultBlock)(selectedBlock)) {
      replaceBlocks(selectedBlock.clientId, blocks);
    } else {
      insertBlocks(blocks, getInsertionIndex(), destinationRootClientId, __experimentalSelectBlockOnInsert);
    }

    onSelect();
  };

  var onHover = function onHover(item) {
    setHoveredItem(item);

    if (item) {
      var index = getInsertionIndex();
      showInsertionPoint(destinationRootClientId, index);
    } else {
      hideInsertionPoint();
    }
  };

  var blocksTab = (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    className: "block-editor-inserter__block-list"
  }, (0, _element.createElement)("div", {
    className: "block-editor-inserter__scrollable"
  }, (0, _element.createElement)(_blockList.default, {
    rootClientId: destinationRootClientId,
    onInsert: onInsertBlocks,
    onHover: onHover,
    __experimentalSelectBlockOnInsert: __experimentalSelectBlockOnInsert,
    filterValue: filterValue
  }))), showInserterHelpPanel && (0, _element.createElement)("div", {
    className: "block-editor-inserter__tips"
  }, (0, _element.createElement)(_tips.default, null)));
  var patternsTab = (0, _element.createElement)("div", {
    className: "block-editor-inserter__scrollable"
  }, (0, _element.createElement)(_blockPatterns.default, {
    onInsert: onInsertBlocks,
    filterValue: filterValue
  })); // Disable reason (no-autofocus): The inserter menu is a modal display, not one which
  // is always visible, and one which already incurs this behavior of autoFocus via
  // Popover's focusOnMount.
  // Disable reason (no-static-element-interactions): Navigational key-presses within
  // the menu are prevented from triggering WritingFlow and ObserveTyping interactions.

  /* eslint-disable jsx-a11y/no-autofocus, jsx-a11y/no-static-element-interactions */

  return (0, _element.createElement)("div", {
    className: "block-editor-inserter__menu",
    onKeyPress: stopKeyPropagation,
    onKeyDown: onKeyDown
  }, (0, _element.createElement)("div", {
    className: "block-editor-inserter__main-area"
  }, (0, _element.createElement)(_searchForm.default, {
    onChange: setFilterValue
  }), showPatterns && (0, _element.createElement)(_components.TabPanel, {
    className: "block-editor-inserter__tabs",
    tabs: [{
      name: 'blocks',

      /* translators: Blocks tab title in the block inserter. */
      title: (0, _i18n.__)('Blocks')
    }, {
      name: 'patterns',

      /* translators: Patterns tab title in the block inserter. */
      title: (0, _i18n.__)('Patterns')
    }]
  }, function (tab) {
    if (tab.name === 'blocks') {
      return blocksTab;
    }

    return patternsTab;
  }), !showPatterns && blocksTab), showInserterHelpPanel && hoveredItem && (0, _element.createElement)("div", {
    className: "block-editor-inserter__preview-container"
  }, (0, _element.createElement)(_previewPanel.default, {
    item: hoveredItem
  })));
  /* eslint-enable jsx-a11y/no-autofocus, jsx-a11y/no-static-element-interactions */
}

var _default = InserterMenu;
exports.default = _default;
//# sourceMappingURL=menu.js.map