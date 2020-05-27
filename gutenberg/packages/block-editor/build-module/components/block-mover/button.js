import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { castArray, first, last } from 'lodash';
/**
 * WordPress dependencies
 */

import { getBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { forwardRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { leftArrow, rightArrow } from './icons';
import { chevronUp, chevronDown } from '@wordpress/icons';
import { getBlockMoverDescription } from './mover-description';

var getArrowIcon = function getArrowIcon(direction, orientation, isRTL) {
  if (direction === 'up') {
    if (orientation === 'horizontal') {
      return isRTL ? rightArrow : leftArrow;
    }

    return chevronUp;
  } else if (direction === 'down') {
    if (orientation === 'horizontal') {
      return isRTL ? leftArrow : rightArrow;
    }

    return chevronDown;
  }

  return null;
};

var getMovementDirectionLabel = function getMovementDirectionLabel(moveDirection, orientation, isRTL) {
  if (moveDirection === 'up') {
    if (orientation === 'horizontal') {
      return isRTL ? __('Move right') : __('Move left');
    }

    return __('Move up');
  } else if (moveDirection === 'down') {
    if (orientation === 'horizontal') {
      return isRTL ? __('Move left') : __('Move right');
    }

    return __('Move down');
  }

  return null;
};

var BlockMoverButton = forwardRef(function (_ref, ref) {
  var clientIds = _ref.clientIds,
      direction = _ref.direction,
      orientation = _ref.__experimentalOrientation,
      props = _objectWithoutProperties(_ref, ["clientIds", "direction", "__experimentalOrientation"]);

  var instanceId = useInstanceId(BlockMoverButton);
  var blocksCount = castArray(clientIds).length;

  var _useSelect = useSelect(function (select) {
    var _select = select('core/block-editor'),
        getBlockIndex = _select.getBlockIndex,
        getBlockRootClientId = _select.getBlockRootClientId,
        getBlockOrder = _select.getBlockOrder,
        getBlock = _select.getBlock,
        getSettings = _select.getSettings,
        getBlockListSettings = _select.getBlockListSettings;

    var normalizedClientIds = castArray(clientIds);
    var firstClientId = first(normalizedClientIds);
    var blockRootClientId = getBlockRootClientId(firstClientId);
    var firstBlockIndex = getBlockIndex(firstClientId, blockRootClientId);
    var lastBlockIndex = getBlockIndex(last(normalizedClientIds), blockRootClientId);
    var blockOrder = getBlockOrder(blockRootClientId);
    var block = getBlock(firstClientId);
    var isFirstBlock = firstBlockIndex === 0;
    var isLastBlock = lastBlockIndex === blockOrder.length - 1;

    var _ref2 = getBlockListSettings(blockRootClientId) || {},
        _ref2$__experimentalM = _ref2.__experimentalMoverDirection,
        __experimentalMoverDirection = _ref2$__experimentalM === void 0 ? 'vertical' : _ref2$__experimentalM;

    return {
      blockType: block ? getBlockType(block.name) : null,
      isDisabled: direction === 'up' ? isFirstBlock : isLastBlock,
      rootClientId: blockRootClientId,
      firstIndex: firstBlockIndex,
      isFirst: isFirstBlock,
      isLast: isLastBlock,
      isRTL: getSettings().isRTL,
      moverOrientation: orientation || __experimentalMoverDirection
    };
  }, [clientIds, direction]),
      blockType = _useSelect.blockType,
      isDisabled = _useSelect.isDisabled,
      rootClientId = _useSelect.rootClientId,
      isFirst = _useSelect.isFirst,
      isLast = _useSelect.isLast,
      firstIndex = _useSelect.firstIndex,
      isRTL = _useSelect.isRTL,
      moverOrientation = _useSelect.moverOrientation;

  var _useDispatch = useDispatch('core/block-editor'),
      moveBlocksDown = _useDispatch.moveBlocksDown,
      moveBlocksUp = _useDispatch.moveBlocksUp;

  var moverFunction = direction === 'up' ? moveBlocksUp : moveBlocksDown;

  var onClick = function onClick(event) {
    moverFunction(clientIds, rootClientId);

    if (props.onClick) {
      props.onClick(event);
    }
  };

  var descriptionId = "block-editor-block-mover-button__description-".concat(instanceId);
  return createElement(Fragment, null, createElement(Button, _extends({
    ref: ref,
    className: classnames('block-editor-block-mover-button', "is-".concat(direction, "-button")),
    icon: getArrowIcon(direction, moverOrientation, isRTL),
    label: getMovementDirectionLabel(direction, moverOrientation, isRTL),
    "aria-describedby": descriptionId
  }, props, {
    onClick: isDisabled ? null : onClick,
    "aria-disabled": isDisabled
  })), createElement("span", {
    id: descriptionId,
    className: "block-editor-block-mover-button__description"
  }, getBlockMoverDescription(blocksCount, blockType && blockType.title, firstIndex, isFirst, isLast, direction === 'up' ? -1 : 1, moverOrientation, isRTL)));
});
export var BlockMoverUpButton = forwardRef(function (props, ref) {
  return createElement(BlockMoverButton, _extends({
    direction: "up",
    ref: ref
  }, props));
});
export var BlockMoverDownButton = forwardRef(function (props, ref) {
  return createElement(BlockMoverButton, _extends({
    direction: "down",
    ref: ref
  }, props));
});
//# sourceMappingURL=button.js.map