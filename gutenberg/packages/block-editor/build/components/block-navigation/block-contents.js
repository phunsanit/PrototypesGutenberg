"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _context = require("./context");

var _blockSlot = _interopRequireDefault(require("./block-slot"));

var _blockSelectButton = _interopRequireDefault(require("./block-select-button"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockNavigationBlockContents = (0, _element.forwardRef)(function (_ref, ref) {
  var onClick = _ref.onClick,
      block = _ref.block,
      isSelected = _ref.isSelected,
      position = _ref.position,
      siblingCount = _ref.siblingCount,
      level = _ref.level,
      props = (0, _objectWithoutProperties2.default)(_ref, ["onClick", "block", "isSelected", "position", "siblingCount", "level"]);

  var _useBlockNavigationCo = (0, _context.useBlockNavigationContext)(),
      withBlockNavigationSlots = _useBlockNavigationCo.__experimentalWithBlockNavigationSlots;

  return withBlockNavigationSlots ? (0, _element.createElement)(_blockSlot.default, (0, _extends2.default)({
    ref: ref,
    className: "block-editor-block-navigation-block-contents",
    block: block,
    onClick: onClick,
    isSelected: isSelected,
    position: position,
    siblingCount: siblingCount,
    level: level
  }, props)) : (0, _element.createElement)(_blockSelectButton.default, (0, _extends2.default)({
    ref: ref,
    className: "block-editor-block-navigation-block-contents",
    block: block,
    onClick: onClick,
    isSelected: isSelected,
    position: position,
    siblingCount: siblingCount,
    level: level
  }, props));
});
var _default = BlockNavigationBlockContents;
exports.default = _default;
//# sourceMappingURL=block-contents.js.map