"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _icons = require("@wordpress/icons");

var _moverDescription = require("../block-mover/mover-description");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockActionsMenu = function BlockActionsMenu(_ref) {
  var onDelete = _ref.onDelete,
      isStackedHorizontally = _ref.isStackedHorizontally,
      wrapBlockSettings = _ref.wrapBlockSettings,
      wrapBlockMover = _ref.wrapBlockMover,
      openGeneralSidebar = _ref.openGeneralSidebar,
      onMoveDown = _ref.onMoveDown,
      onMoveUp = _ref.onMoveUp,
      isFirst = _ref.isFirst,
      isLast = _ref.isLast,
      blockTitle = _ref.blockTitle,
      isEmptyDefaultBlock = _ref.isEmptyDefaultBlock,
      anchorNodeRef = _ref.anchorNodeRef;
  var pickerRef = (0, _element.useRef)();
  var moversOptions = {
    keys: ['icon', 'actionTitle'],
    blockTitle: blockTitle
  };

  var _getMoversSetup = (0, _moverDescription.getMoversSetup)(isStackedHorizontally, moversOptions),
      _getMoversSetup$icon = _getMoversSetup.icon,
      backwardButtonIcon = _getMoversSetup$icon.backward,
      forwardButtonIcon = _getMoversSetup$icon.forward,
      _getMoversSetup$actio = _getMoversSetup.actionTitle,
      backwardButtonTitle = _getMoversSetup$actio.backward,
      forwardButtonTitle = _getMoversSetup$actio.forward;

  var deleteOption = {
    id: 'deleteOption',
    // translators: %s: block title e.g: "Paragraph".
    label: (0, _i18n.sprintf)((0, _i18n.__)('Remove %s'), blockTitle),
    value: 'deleteOption',
    icon: _icons.trash,
    separated: true,
    disabled: isEmptyDefaultBlock
  };
  var settingsOption = {
    id: 'settingsOption',
    // translators: %s: block title e.g: "Paragraph".
    label: (0, _i18n.sprintf)((0, _i18n.__)('%s Settings'), blockTitle),
    value: 'settingsOption',
    icon: _icons.cog
  };
  var backwardButtonOption = {
    id: 'backwardButtonOption',
    label: backwardButtonTitle,
    value: 'backwardButtonOption',
    icon: backwardButtonIcon,
    disabled: isFirst
  };
  var forwardButtonOption = {
    id: 'forwardButtonOption',
    label: forwardButtonTitle,
    value: 'forwardButtonOption',
    icon: forwardButtonIcon,
    disabled: isLast
  };
  var options = (0, _lodash.compact)([wrapBlockMover && backwardButtonOption, wrapBlockMover && forwardButtonOption, wrapBlockSettings && settingsOption, deleteOption]);

  function onPickerSelect(value) {
    switch (value) {
      case deleteOption.value:
        onDelete();
        break;

      case settingsOption.value:
        openGeneralSidebar();
        break;

      case forwardButtonOption.value:
        onMoveDown();
        break;

      case backwardButtonOption.value:
        onMoveUp();
        break;
    }
  }

  function onPickerPresent() {
    if (pickerRef.current) {
      pickerRef.current.presentPicker();
    }
  }

  var disabledButtonIndices = options.map(function (option, index) {
    return option.disabled && index + 1;
  }).filter(Boolean);
  var accessibilityHint = _reactNative.Platform.OS === 'ios' ? (0, _i18n.__)('Double tap to open Action Sheet with available options') : (0, _i18n.__)('Double tap to open Bottom Sheet with available options');
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.ToolbarButton, {
    title: (0, _i18n.__)('Open Block Actions Menu'),
    onClick: onPickerPresent,
    icon: _icons.moreHorizontalMobile,
    extraProps: {
      hint: accessibilityHint
    }
  }), (0, _element.createElement)(_components.Picker, {
    ref: pickerRef,
    options: options,
    onChange: onPickerSelect,
    destructiveButtonIndex: options.length,
    disabledButtonIndices: disabledButtonIndices,
    hideCancelButton: _reactNative.Platform.OS !== 'ios',
    anchor: anchorNodeRef ? (0, _reactNative.findNodeHandle)(anchorNodeRef) : undefined
  }));
};

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref2) {
  var clientIds = _ref2.clientIds;

  var _select = select('core/block-editor'),
      getBlockIndex = _select.getBlockIndex,
      getBlockRootClientId = _select.getBlockRootClientId,
      getBlockOrder = _select.getBlockOrder,
      getBlockName = _select.getBlockName,
      getBlock = _select.getBlock;

  var normalizedClientIds = (0, _lodash.castArray)(clientIds);
  var block = getBlock(normalizedClientIds);
  var blockName = getBlockName(normalizedClientIds);
  var blockType = (0, _blocks.getBlockType)(blockName);
  var blockTitle = blockType.title;
  var firstClientId = (0, _lodash.first)(normalizedClientIds);
  var rootClientId = getBlockRootClientId(firstClientId);
  var blockOrder = getBlockOrder(rootClientId);
  var firstIndex = getBlockIndex(firstClientId, rootClientId);
  var lastIndex = getBlockIndex((0, _lodash.last)(normalizedClientIds), rootClientId);
  var isDefaultBlock = blockName === (0, _blocks.getDefaultBlockName)();
  var isEmptyContent = block.attributes.content === '';
  var isExactlyOneBlock = blockOrder.length === 1;
  var isEmptyDefaultBlock = isExactlyOneBlock && isDefaultBlock && isEmptyContent;
  return {
    isFirst: firstIndex === 0,
    isLast: lastIndex === blockOrder.length - 1,
    rootClientId: rootClientId,
    blockTitle: blockTitle,
    isEmptyDefaultBlock: isEmptyDefaultBlock
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var clientIds = _ref3.clientIds,
      rootClientId = _ref3.rootClientId;

  var _dispatch = dispatch('core/block-editor'),
      moveBlocksDown = _dispatch.moveBlocksDown,
      moveBlocksUp = _dispatch.moveBlocksUp;

  var _dispatch2 = dispatch('core/edit-post'),
      _openGeneralSidebar = _dispatch2.openGeneralSidebar;

  return {
    onMoveDown: (0, _lodash.partial)(moveBlocksDown, clientIds, rootClientId),
    onMoveUp: (0, _lodash.partial)(moveBlocksUp, clientIds, rootClientId),
    openGeneralSidebar: function openGeneralSidebar() {
      return _openGeneralSidebar('edit-post/block');
    }
  };
}), _compose.withInstanceId)(BlockActionsMenu);

exports.default = _default;
//# sourceMappingURL=block-actions-menu.native.js.map