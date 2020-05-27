import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __experimentalTreeGridCell as TreeGridCell } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { useState } from '@wordpress/element';
/**
 * Internal dependencies
 */

import BlockNavigationLeaf from './leaf';
import { BlockMoverUpButton, BlockMoverDownButton } from '../block-mover/button';
import DescenderLines from './descender-lines';
import BlockNavigationBlockContents from './block-contents';
import BlockSettingsDropdown from '../block-settings-menu/block-settings-dropdown';
import { useBlockNavigationContext } from './context';
export default function BlockNavigationBlock(_ref) {
  var block = _ref.block,
      onClick = _ref.onClick,
      isSelected = _ref.isSelected,
      position = _ref.position,
      level = _ref.level,
      rowCount = _ref.rowCount,
      showBlockMovers = _ref.showBlockMovers,
      terminatedLevels = _ref.terminatedLevels,
      path = _ref.path;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isHovered = _useState2[0],
      setIsHovered = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var clientId = block.clientId; // Subtract 1 from rowCount, as it includes the block appender.

  var siblingCount = rowCount - 1;
  var hasSiblings = siblingCount > 1;
  var hasRenderedMovers = showBlockMovers && hasSiblings;
  var hasVisibleMovers = isHovered || isSelected || isFocused;
  var moverCellClassName = classnames('block-editor-block-navigation-block__mover-cell', {
    'is-visible': hasVisibleMovers
  });

  var _useBlockNavigationCo = useBlockNavigationContext(),
      withBlockNavigationBlockSettings = _useBlockNavigationCo.__experimentalWithBlockNavigationBlockSettings,
      blockNavigationBlockSettingsMinLevel = _useBlockNavigationCo.__experimentalWithBlockNavigationBlockSettingsMinLevel;

  var blockNavigationBlockSettingsClassName = classnames('block-editor-block-navigation-block__menu-cell', {
    'is-visible': hasVisibleMovers
  });
  return createElement(BlockNavigationLeaf, {
    className: classnames({
      'is-selected': isSelected
    }),
    onMouseEnter: function onMouseEnter() {
      return setIsHovered(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHovered(false);
    },
    onFocus: function onFocus() {
      return setIsFocused(true);
    },
    onBlur: function onBlur() {
      return setIsFocused(false);
    },
    level: level,
    position: position,
    rowCount: rowCount,
    path: path
  }, createElement(TreeGridCell, {
    className: "block-editor-block-navigation-block__contents-cell",
    colSpan: hasRenderedMovers ? undefined : 3
  }, function (props) {
    return createElement("div", {
      className: "block-editor-block-navigation-block__contents-container"
    }, createElement(DescenderLines, {
      level: level,
      isLastRow: position === rowCount,
      terminatedLevels: terminatedLevels
    }), createElement(BlockNavigationBlockContents, _extends({
      block: block,
      onClick: onClick,
      isSelected: isSelected,
      position: position,
      siblingCount: siblingCount,
      level: level
    }, props)));
  }), hasRenderedMovers && createElement(Fragment, null, createElement(TreeGridCell, {
    className: moverCellClassName
  }, function (props) {
    return createElement(BlockMoverUpButton, _extends({
      __experimentalOrientation: "vertical",
      clientIds: [clientId]
    }, props));
  }), createElement(TreeGridCell, {
    className: moverCellClassName
  }, function (props) {
    return createElement(BlockMoverDownButton, _extends({
      __experimentalOrientation: "vertical",
      clientIds: [clientId]
    }, props));
  })), withBlockNavigationBlockSettings && level >= blockNavigationBlockSettingsMinLevel && createElement(TreeGridCell, {
    className: blockNavigationBlockSettingsClassName
  }, function (props) {
    return createElement(BlockSettingsDropdown, _extends({
      clientIds: [clientId],
      icon: moreVertical
    }, props));
  }));
}
//# sourceMappingURL=block.js.map