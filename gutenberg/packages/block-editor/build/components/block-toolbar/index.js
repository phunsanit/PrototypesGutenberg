"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockToolbar;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blockMover = _interopRequireDefault(require("../block-mover"));

var _blockParentSelector = _interopRequireDefault(require("../block-parent-selector"));

var _blockSwitcher = _interopRequireDefault(require("../block-switcher"));

var _blockControls = _interopRequireDefault(require("../block-controls"));

var _blockFormatControls = _interopRequireDefault(require("../block-format-controls"));

var _blockSettingsMenu = _interopRequireDefault(require("../block-settings-menu"));

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockToolbar(_ref) {
  var hideDragHandle = _ref.hideDragHandle;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getBlockMode = _select.getBlockMode,
        getSelectedBlockClientIds = _select.getSelectedBlockClientIds,
        isBlockValid = _select.isBlockValid,
        getBlockRootClientId = _select.getBlockRootClientId,
        getBlockListSettings = _select.getBlockListSettings,
        getSettings = _select.getSettings;

    var selectedBlockClientIds = getSelectedBlockClientIds();
    var selectedBlockClientId = selectedBlockClientIds[0];
    var blockRootClientId = getBlockRootClientId(selectedBlockClientId);

    var _ref2 = getBlockListSettings(blockRootClientId) || {},
        __experimentalMoverDirection = _ref2.__experimentalMoverDirection;

    return {
      blockClientIds: selectedBlockClientIds,
      blockClientId: selectedBlockClientId,
      hasFixedToolbar: getSettings().hasFixedToolbar,
      rootClientId: blockRootClientId,
      isValid: selectedBlockClientIds.length === 1 ? isBlockValid(selectedBlockClientIds[0]) : null,
      mode: selectedBlockClientIds.length === 1 ? getBlockMode(selectedBlockClientIds[0]) : null,
      moverDirection: __experimentalMoverDirection
    };
  }, []),
      blockClientIds = _useSelect.blockClientIds,
      blockClientId = _useSelect.blockClientId,
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      isValid = _useSelect.isValid,
      mode = _useSelect.mode,
      moverDirection = _useSelect.moverDirection;

  var toggleBlockHighlight = (0, _utils.useToggleBlockHighlight)(blockClientId);
  var nodeRef = (0, _element.useRef)();

  var _useShowMoversGesture = (0, _utils.useShowMoversGestures)({
    ref: nodeRef,
    onChange: toggleBlockHighlight
  }),
      showMovers = _useShowMoversGesture.showMovers,
      showMoversGestures = _useShowMoversGesture.gestures;

  var displayHeaderToolbar = (0, _compose.useViewportMatch)('medium', '<') || hasFixedToolbar;
  var shouldShowMovers = displayHeaderToolbar || showMovers;

  if (blockClientIds.length === 0) {
    return null;
  }

  var shouldShowVisualToolbar = isValid && mode === 'visual';
  var isMultiToolbar = blockClientIds.length > 1;
  var animatedMoverStyles = {
    opacity: shouldShowMovers ? 1 : 0,
    transform: shouldShowMovers ? 'translateX(0px)' : 'translateX(100%)'
  };
  var classes = (0, _classnames.default)('block-editor-block-toolbar', shouldShowMovers && 'is-showing-movers', !displayHeaderToolbar && 'has-responsive-movers');
  return (0, _element.createElement)("div", {
    className: classes
  }, (0, _element.createElement)("div", {
    className: "block-editor-block-toolbar__mover-switcher-container",
    ref: nodeRef
  }, !isMultiToolbar && (0, _element.createElement)("div", {
    className: "block-editor-block-toolbar__block-parent-selector-wrapper"
  }, (0, _element.createElement)(_blockParentSelector.default, {
    clientIds: blockClientIds
  })), (0, _element.createElement)("div", (0, _extends2.default)({
    className: "block-editor-block-toolbar__mover-trigger-container"
  }, showMoversGestures), (0, _element.createElement)("div", {
    className: "block-editor-block-toolbar__mover-trigger-wrapper",
    style: animatedMoverStyles
  }, (0, _element.createElement)(_blockMover.default, {
    clientIds: blockClientIds,
    __experimentalOrientation: moverDirection,
    hideDragHandle: hideDragHandle
  }))), (shouldShowVisualToolbar || isMultiToolbar) && (0, _element.createElement)("div", (0, _extends2.default)({}, showMoversGestures, {
    className: "block-editor-block-toolbar__block-switcher-wrapper"
  }), (0, _element.createElement)(_blockSwitcher.default, {
    clientIds: blockClientIds
  }))), shouldShowVisualToolbar && !isMultiToolbar && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockControls.default.Slot, {
    bubblesVirtually: true,
    className: "block-editor-block-toolbar__slot"
  }), (0, _element.createElement)(_blockFormatControls.default.Slot, {
    bubblesVirtually: true,
    className: "block-editor-block-toolbar__slot"
  })), (0, _element.createElement)(_blockSettingsMenu.default, {
    clientIds: blockClientIds
  }));
}
//# sourceMappingURL=index.js.map