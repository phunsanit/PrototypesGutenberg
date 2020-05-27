"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bold = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
var name = 'core/bold';
var title = (0, _i18n.__)('Bold');
var bold = {
  name: name,
  title: title,
  tagName: 'strong',
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

    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.RichTextShortcut, {
      type: "primary",
      character: "b",
      onUse: onToggle
    }), (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
      name: "bold",
      icon: _icons.formatBold,
      title: title,
      onClick: onClick,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "b"
    }), (0, _element.createElement)(_blockEditor.__unstableRichTextInputEvent, {
      inputType: "formatBold",
      onInput: onToggle
    }));
  }
};
exports.bold = bold;
//# sourceMappingURL=index.js.map