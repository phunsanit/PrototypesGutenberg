"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.code = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
var name = 'core/code';
var title = (0, _i18n.__)('Inline Code');
var code = {
  name: name,
  title: title,
  tagName: 'code',
  className: null,
  __unstableInputRule: function __unstableInputRule(value) {
    var BACKTICK = '`';
    var _value = value,
        start = _value.start,
        text = _value.text;
    var characterBefore = text.slice(start - 1, start); // Quick check the text for the necessary character.

    if (characterBefore !== BACKTICK) {
      return value;
    }

    var textBefore = text.slice(0, start - 1);
    var indexBefore = textBefore.lastIndexOf(BACKTICK);

    if (indexBefore === -1) {
      return value;
    }

    var startIndex = indexBefore;
    var endIndex = start - 2;

    if (startIndex === endIndex) {
      return value;
    }

    value = (0, _richText.remove)(value, startIndex, startIndex + 1);
    value = (0, _richText.remove)(value, endIndex, endIndex + 1);
    value = (0, _richText.applyFormat)(value, {
      type: name
    }, startIndex, endIndex);
    return value;
  },
  edit: function edit(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus,
        isActive = _ref.isActive;

    function onClick() {
      onChange((0, _richText.toggleFormat)(value, {
        type: name
      }));
      onFocus();
    }

    return (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
      icon: _icons.code,
      title: title,
      onClick: onClick,
      isActive: isActive
    });
  }
};
exports.code = code;
//# sourceMappingURL=index.js.map