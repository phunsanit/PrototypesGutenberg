"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockNavigationBlock;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _leaf = _interopRequireDefault(require("./leaf"));

var _button = require("../block-mover/button");

var _descenderLines = _interopRequireDefault(require("./descender-lines"));

var _blockContents = _interopRequireDefault(require("./block-contents"));

var _blockSettingsDropdown = _interopRequireDefault(require("../block-settings-menu/block-settings-dropdown"));

var _context = require("./context");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockNavigationBlock(_ref) {
  var block = _ref.block,
      onClick = _ref.onClick,
      isSelected = _ref.isSelected,
      position = _ref.position,
      level = _ref.level,
      rowCount = _ref.rowCount,
      showBlockMovers = _ref.showBlockMovers,
      terminatedLevels = _ref.terminatedLevels,
      path = _ref.path;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isHovered = _useState2[0],
      setIsHovered = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var clientId = block.clientId; // Subtract 1 from rowCount, as it includes the block appender.

  var siblingCount = rowCount - 1;
  var hasSiblings = siblingCount > 1;
  var hasRenderedMovers = showBlockMovers && hasSiblings;
  var hasVisibleMovers = isHovered || isSelected || isFocused;
  var moverCellClassName = (0, _classnames.default)('block-editor-block-navigation-block__mover-cell', {
    'is-visible': hasVisibleMovers
  });

  var _useBlockNavigationCo = (0, _context.useBlockNavigationContext)(),
      withBlockNavigationBlockSettings = _useBlockNavigationCo.__experimentalWithBlockNavigationBlockSettings,
      blockNavigationBlockSettingsMinLevel = _useBlockNavigationCo.__experimentalWithBlockNavigationBlockSettingsMinLevel;

  var blockNavigationBlockSettingsClassName = (0, _classnames.default)('block-editor-block-navigation-block__menu-cell', {
    'is-visible': hasVisibleMovers
  });
  return (0, _element.createElement)(_leaf.default, {
    className: (0, _classnames.default)({
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
  }, (0, _element.createElement)(_components.__experimentalTreeGridCell, {
    className: "block-editor-block-navigation-block__contents-cell",
    colSpan: hasRenderedMovers ? undefined : 3
  }, function (props) {
    return (0, _element.createElement)("div", {
      className: "block-editor-block-navigation-block__contents-container"
    }, (0, _element.createElement)(_descenderLines.default, {
      level: level,
      isLastRow: position === rowCount,
      terminatedLevels: terminatedLevels
    }), (0, _element.createElement)(_blockContents.default, (0, _extends2.default)({
      block: block,
      onClick: onClick,
      isSelected: isSelected,
      position: position,
      siblingCount: siblingCount,
      level: level
    }, props)));
  }), hasRenderedMovers && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.__experimentalTreeGridCell, {
    className: moverCellClassName
  }, function (props) {
    return (0, _element.createElement)(_button.BlockMoverUpButton, (0, _extends2.default)({
      __experimentalOrientation: "vertical",
      clientIds: [clientId]
    }, props));
  }), (0, _element.createElement)(_components.__experimentalTreeGridCell, {
    className: moverCellClassName
  }, function (props) {
    return (0, _element.createElement)(_button.BlockMoverDownButton, (0, _extends2.default)({
      __experimentalOrientation: "vertical",
      clientIds: [clientId]
    }, props));
  })), withBlockNavigationBlockSettings && level >= blockNavigationBlockSettingsMinLevel && (0, _element.createElement)(_components.__experimentalTreeGridCell, {
    className: blockNavigationBlockSettingsClassName
  }, function (props) {
    return (0, _element.createElement)(_blockSettingsDropdown.default, (0, _extends2.default)({
      clientIds: [clientId],
      icon: _icons.moreVertical
    }, props));
  }));
}
//# sourceMappingURL=block.js.map