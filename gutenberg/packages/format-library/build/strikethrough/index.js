"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strikethrough = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
var name = 'core/strikethrough';
var title = (0, _i18n.__)('Strikethrough');
var strikethrough = {
  name: name,
  title: title,
  tagName: 's',
  className: null,
  edit: function edit(_ref) {
    var isActive = _ref.isActive,
        value = _ref.value,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus;

    function onClick() {
      onChange((0, _richText.toggleFormat)(value, {
        type: name
      }));
      onFocus();
    }

    return (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
      icon: _icons.formatStrikethrough,
      title: title,
      onClick: onClick,
      isActive: isActive
    });
  }
};
exports.strikethrough = strikethrough;
//# sourceMappingURL=index.js.map