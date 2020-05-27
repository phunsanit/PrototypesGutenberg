import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat, remove, applyFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { code as codeIcon } from '@wordpress/icons';
var name = 'core/code';

var title = __('Inline Code');

export var code = {
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

    value = remove(value, startIndex, startIndex + 1);
    value = remove(value, endIndex, endIndex + 1);
    value = applyFormat(value, {
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
      onChange(toggleFormat(value, {
        type: name
      }));
      onFocus();
    }

    return createElement(RichTextToolbarButton, {
      icon: codeIcon,
      title: title,
      onClick: onClick,
      isActive: isActive
    });
  }
};
//# sourceMappingURL=index.js.map