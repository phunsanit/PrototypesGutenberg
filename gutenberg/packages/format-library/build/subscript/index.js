"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscript = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
var name = 'core/subscript';
var title = (0, _i18n.__)('Subscript');
var subscript = {
  name: name,
  title: title,
  tagName: 'sub',
  className: null,
  edit: function edit(_ref) {
    var isActive = _ref.isActive,
        value = _ref.value,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus;

    function onToggle() {
      onChange((0, _richText.toggleFormat)(value, {
        type: name
      }));
    }

    function onClick() {
      onToggle();
      onFocus();
    }

    return (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
      icon: _icons.subscript,
      title: title,
      onClick: onClick,
      isActive: isActive
    });
  }
};
exports.subscript = subscript;
//# sourceMappingURL=index.js.map