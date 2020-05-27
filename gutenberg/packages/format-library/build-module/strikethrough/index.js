import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { formatStrikethrough } from '@wordpress/icons';
var name = 'core/strikethrough';

var title = __('Strikethrough');

export var strikethrough = {
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
      onChange(toggleFormat(value, {
        type: name
      }));
      onFocus();
    }

    return createElement(RichTextToolbarButton, {
      icon: formatStrikethrough,
      title: title,
      onClick: onClick,
      isActive: isActive
    });
  }
};
//# sourceMappingURL=index.js.map