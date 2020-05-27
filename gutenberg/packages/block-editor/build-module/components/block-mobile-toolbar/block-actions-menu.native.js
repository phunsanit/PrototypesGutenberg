import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { Platform, findNodeHandle } from 'react-native';
import { partial, first, castArray, last, compact } from 'lodash';
/**
 * WordPress dependencies
 */

import { ToolbarButton, Picker } from '@wordpress/components';
import { getBlockType, getDefaultBlockName } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';
import { withDispatch, withSelect } from '@wordpress/data';
import { withInstanceId, compose } from '@wordpress/compose';
import { moreHorizontalMobile, trash, cog } from '@wordpress/icons';
import { useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { getMoversSetup } from '../block-mover/mover-description';

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
  var pickerRef = useRef();
  var moversOptions = {
    keys: ['icon', 'actionTitle'],
    blockTitle: blockTitle
  };

  var _getMoversSetup = getMoversSetup(isStackedHorizontally, moversOptions),
      _getMoversSetup$icon = _getMoversSetup.icon,
      backwardButtonIcon = _getMoversSetup$icon.backward,
      forwardButtonIcon = _getMoversSetup$icon.forward,
      _getMoversSetup$actio = _getMoversSetup.actionTitle,
      backwardButtonTitle = _getMoversSetup$actio.backward,
      forwardButtonTitle = _getMoversSetup$actio.forward;

  var deleteOption = {
    id: 'deleteOption',
    // translators: %s: block title e.g: "Paragraph".
    label: sprintf(__('Remove %s'), blockTitle),
    value: 'deleteOption',
    icon: trash,
    separated: true,
    disabled: isEmptyDefaultBlock
  };
  var settingsOption = {
    id: 'settingsOption',
    // translators: %s: block title e.g: "Paragraph".
    label: sprintf(__('%s Settings'), blockTitle),
    value: 'settingsOption',
    icon: cog
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
  var options = compact([wrapBlockMover && backwardButtonOption, wrapBlockMover && forwardButtonOption, wrapBlockSettings && settingsOption, deleteOption]);

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
  var accessibilityHint = Platform.OS === 'ios' ? __('Double tap to open Action Sheet with available options') : __('Double tap to open Bottom Sheet with available options');
  return createElement(Fragment, null, createElement(ToolbarButton, {
    title: __('Open Block Actions Menu'),
    onClick: onPickerPresent,
    icon: moreHorizontalMobile,
    extraProps: {
      hint: accessibilityHint
    }
  }), createElement(Picker, {
    ref: pickerRef,
    options: options,
    onChange: onPickerSelect,
    destructiveButtonIndex: options.length,
    disabledButtonIndices: disabledButtonIndices,
    hideCancelButton: Platform.OS !== 'ios',
    anchor: anchorNodeRef ? findNodeHandle(anchorNodeRef) : undefined
  }));
};

export default compose(withSelect(function (select, _ref2) {
  var clientIds = _ref2.clientIds;

  var _select = select('core/block-editor'),
      getBlockIndex = _select.getBlockIndex,
      getBlockRootClientId = _select.getBlockRootClientId,
      getBlockOrder = _select.getBlockOrder,
      getBlockName = _select.getBlockName,
      getBlock = _select.getBlock;

  var normalizedClientIds = castArray(clientIds);
  var block = getBlock(normalizedClientIds);
  var blockName = getBlockName(normalizedClientIds);
  var blockType = getBlockType(blockName);
  var blockTitle = blockType.title;
  var firstClientId = first(normalizedClientIds);
  var rootClientId = getBlockRootClientId(firstClientId);
  var blockOrder = getBlockOrder(rootClientId);
  var firstIndex = getBlockIndex(firstClientId, rootClientId);
  var lastIndex = getBlockIndex(last(normalizedClientIds), rootClientId);
  var isDefaultBlock = blockName === getDefaultBlockName();
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
}), withDispatch(function (dispatch, _ref3) {
  var clientIds = _ref3.clientIds,
      rootClientId = _ref3.rootClientId;

  var _dispatch = dispatch('core/block-editor'),
      moveBlocksDown = _dispatch.moveBlocksDown,
      moveBlocksUp = _dispatch.moveBlocksUp;

  var _dispatch2 = dispatch('core/edit-post'),
      _openGeneralSidebar = _dispatch2.openGeneralSidebar;

  return {
    onMoveDown: partial(moveBlocksDown, clientIds, rootClientId),
    onMoveUp: partial(moveBlocksUp, clientIds, rootClientId),
    openGeneralSidebar: function openGeneralSidebar() {
      return _openGeneralSidebar('edit-post/block');
    }
  };
}), withInstanceId)(BlockActionsMenu);
//# sourceMappingURL=block-actions-menu.native.js.map