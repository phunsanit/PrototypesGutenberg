"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _blocks = require("@wordpress/blocks");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _blockIcon = _interopRequireDefault(require("../block-icon"));

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
function BlockNavigationBlockSelectButton(_ref, ref) {
  var className = _ref.className,
      block = _ref.block,
      isSelected = _ref.isSelected,
      onClick = _ref.onClick,
      position = _ref.position,
      siblingCount = _ref.siblingCount,
      level = _ref.level,
      tabIndex = _ref.tabIndex,
      onFocus = _ref.onFocus;
  var name = block.name,
      attributes = block.attributes;
  var blockType = (0, _blocks.getBlockType)(name);
  var blockDisplayName = (0, _blocks.__experimentalGetBlockLabel)(blockType, attributes);
  var instanceId = (0, _compose.useInstanceId)(BlockNavigationBlockSelectButton);
  var descriptionId = "block-navigation-block-select-button__".concat(instanceId);
  var blockPositionDescription = (0, _utils.getBlockPositionDescription)(position, siblingCount, level);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, {
    className: (0, _classnames.default)('block-editor-block-navigation-block-select-button', className),
    onClick: onClick,
    "aria-describedby": descriptionId,
    ref: ref,
    tabIndex: tabIndex,
    onFocus: onFocus
  }, (0, _element.createElement)(_blockIcon.default, {
    icon: blockType.icon,
    showColors: true
  }), blockDisplayName, isSelected && (0, _element.createElement)(_components.VisuallyHidden, null, (0, _i18n.__)('(selected block)'))), (0, _element.createElement)("div", {
    className: "block-editor-block-navigation-block-select-button__description",
    id: descriptionId
  }, blockPositionDescription));
}

var _default = (0, _element.forwardRef)(BlockNavigationBlockSelectButton);

exports.default = _default;
//# sourceMappingURL=block-select-button.js.map