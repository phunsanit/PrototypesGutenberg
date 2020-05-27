import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut, __unstableRichTextInputEvent } from '@wordpress/block-editor';
import { formatItalic } from '@wordpress/icons';
var name = 'core/italic';

var title = __('Italic');

export var italic = {
  name: name,
  title: title,
  tagName: 'em',
  className: null,
  edit: function edit(_ref) {
    var isActive = _ref.isActive,
        value = _ref.value,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus;

    function onToggle() {
      onChange(toggleFormat(value, {
        type: name
      }));
    }

    function onClick() {
      onToggle();
      onFocus();
    }

    return createElement(Fragment, null, createElement(RichTextShortcut, {
      type: "primary",
      character: "i",
      onUse: onToggle
    }), createElement(RichTextToolbarButton, {
      name: "italic",
      icon: formatItalic,
      title: title,
      onClick: onClick,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "i"
    }), createElement(__unstableRichTextInputEvent, {
      inputType: "formatItalic",
      onInput: onToggle
    }));
  }
};
//# sourceMappingURL=index.js.map