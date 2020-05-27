"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var ComplementaryAreaHeader = function ComplementaryAreaHeader(_ref) {
  var smallScreenTitle = _ref.smallScreenTitle,
      toggleShortcut = _ref.toggleShortcut,
      onClose = _ref.onClose,
      children = _ref.children,
      className = _ref.className,
      closeLabel = _ref.closeLabel;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    className: "components-panel__header interface-complementary-area-header__small"
  }, smallScreenTitle && (0, _element.createElement)("span", {
    className: "interface-complementary-area-header__small-title"
  }, smallScreenTitle), (0, _element.createElement)(_components.Button, {
    onClick: onClose,
    icon: _icons.close,
    label: closeLabel
  })), (0, _element.createElement)("div", {
    className: (0, _classnames.default)('components-panel__header', 'interface-complementary-area-header', className),
    tabIndex: -1
  }, children, (0, _element.createElement)(_components.Button, {
    onClick: onClose,
    icon: _icons.close,
    label: closeLabel,
    shortcut: toggleShortcut
  })));
};

var _default = ComplementaryAreaHeader;
exports.default = _default;
//# sourceMappingURL=index.js.map