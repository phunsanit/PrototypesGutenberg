import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut, __unstableRichTextInputEvent } from '@wordpress/block-editor';
import { formatBold } from '@wordpress/icons';
var name = 'core/bold';

var title = __('Bold');

export var bold = {
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
      character: "b",
      onUse: onToggle
    }), createElement(RichTextToolbarButton, {
      name: "bold",
      icon: formatBold,
      title: title,
      onClick: onClick,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "b"
    }), createElement(__unstableRichTextInputEvent, {
      inputType: "formatBold",
      onInput: onToggle
    }));
  }
};
//# sourceMappingURL=index.js.map