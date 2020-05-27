import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { includes, pick } from 'lodash';
/**
 * WordPress dependencies
 */

import { useState } from '@wordpress/element';
import { LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } from '@wordpress/keycodes';
import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { isUnmodifiedDefaultBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import Tips from './tips';
import InserterSearchForm from './search-form';
import InserterPreviewPanel from './preview-panel';
import InserterBlockList from './block-list';
import BlockPatterns from './block-patterns';

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

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      filterValue = _useState2[0],
      setFilterValue = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      hoveredItem = _useState4[0],
      setHoveredItem = _useState4[1];

  var _useSelect = useSelect(function (select) {
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
    }, pick(select('core/block-editor'), ['getSelectedBlock', 'getBlockIndex', 'getBlockSelectionEnd', 'getBlockOrder']));
  }, [isAppender, clientId, rootClientId]),
      destinationRootClientId = _useSelect.destinationRootClientId,
      hasPatterns = _useSelect.hasPatterns,
      getSelectedBlock = _useSelect.getSelectedBlock,
      getBlockIndex = _useSelect.getBlockIndex,
      getBlockSelectionEnd = _useSelect.getBlockSelectionEnd,
      getBlockOrder = _useSelect.getBlockOrder;

  var _useDispatch = useDispatch('core/block-editor'),
      replaceBlocks = _useDispatch.replaceBlocks,
      insertBlocks = _useDispatch.insertBlocks,
      showInsertionPoint = _useDispatch.showInsertionPoint,
      hideInsertionPoint = _useDispatch.hideInsertionPoint;

  var showPatterns = !destinationRootClientId && hasPatterns;

  var onKeyDown = function onKeyDown(event) {
    if (includes([LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER], event.keyCode)) {
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

    if (!isAppender && selectedBlock && isUnmodifiedDefaultBlock(selectedBlock)) {
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

  var blocksTab = createElement(Fragment, null, createElement("div", {
    className: "block-editor-inserter__block-list"
  }, createElement("div", {
    className: "block-editor-inserter__scrollable"
  }, createElement(InserterBlockList, {
    rootClientId: destinationRootClientId,
    onInsert: onInsertBlocks,
    onHover: onHover,
    __experimentalSelectBlockOnInsert: __experimentalSelectBlockOnInsert,
    filterValue: filterValue
  }))), showInserterHelpPanel && createElement("div", {
    className: "block-editor-inserter__tips"
  }, createElement(Tips, null)));
  var patternsTab = createElement("div", {
    className: "block-editor-inserter__scrollable"
  }, createElement(BlockPatterns, {
    onInsert: onInsertBlocks,
    filterValue: filterValue
  })); // Disable reason (no-autofocus): The inserter menu is a modal display, not one which
  // is always visible, and one which already incurs this behavior of autoFocus via
  // Popover's focusOnMount.
  // Disable reason (no-static-element-interactions): Navigational key-presses within
  // the menu are prevented from triggering WritingFlow and ObserveTyping interactions.

  /* eslint-disable jsx-a11y/no-autofocus, jsx-a11y/no-static-element-interactions */

  return createElement("div", {
    className: "block-editor-inserter__menu",
    onKeyPress: stopKeyPropagation,
    onKeyDown: onKeyDown
  }, createElement("div", {
    className: "block-editor-inserter__main-area"
  }, createElement(InserterSearchForm, {
    onChange: setFilterValue
  }), showPatterns && createElement(TabPanel, {
    className: "block-editor-inserter__tabs",
    tabs: [{
      name: 'blocks',

      /* translators: Blocks tab title in the block inserter. */
      title: __('Blocks')
    }, {
      name: 'patterns',

      /* translators: Patterns tab title in the block inserter. */
      title: __('Patterns')
    }]
  }, function (tab) {
    if (tab.name === 'blocks') {
      return blocksTab;
    }

    return patternsTab;
  }), !showPatterns && blocksTab), showInserterHelpPanel && hoveredItem && createElement("div", {
    className: "block-editor-inserter__preview-container"
  }, createElement(InserterPreviewPanel, {
    item: hoveredItem
  })));
  /* eslint-enable jsx-a11y/no-autofocus, jsx-a11y/no-static-element-interactions */
}

export default InserterMenu;
//# sourceMappingURL=menu.js.map