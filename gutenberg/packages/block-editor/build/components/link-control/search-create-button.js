"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LinkControlSearchCreate = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var LinkControlSearchCreate = function LinkControlSearchCreate(_ref) {
  var searchTerm = _ref.searchTerm,
      onClick = _ref.onClick,
      itemProps = _ref.itemProps,
      isSelected = _ref.isSelected;

  if (!searchTerm) {
    return null;
  }

  return (0, _element.createElement)(_components.Button, (0, _extends2.default)({}, itemProps, {
    className: (0, _classnames.default)('block-editor-link-control__search-create block-editor-link-control__search-item', {
      'is-selected': isSelected
    }),
    onClick: onClick
  }), (0, _element.createElement)(_components.Icon, {
    className: "block-editor-link-control__search-item-icon",
    icon: "insert"
  }), (0, _element.createElement)("span", {
    className: "block-editor-link-control__search-item-header"
  }, (0, _element.createElement)("span", {
    className: "block-editor-link-control__search-item-title"
  }, (0, _element.createInterpolateElement)((0, _i18n.sprintf)(
  /* translators: %s: search term. */
  (0, _i18n.__)('New page: <mark>%s</mark>'), searchTerm), {
    mark: (0, _element.createElement)("mark", null)
  }))));
};

exports.LinkControlSearchCreate = LinkControlSearchCreate;
var _default = LinkControlSearchCreate;
exports.default = _default;
//# sourceMappingURL=search-create-button.js.map