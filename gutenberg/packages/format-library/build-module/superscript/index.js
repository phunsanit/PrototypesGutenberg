import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { superscript as superscriptIcon } from '@wordpress/icons';
var name = 'core/superscript';

var title = __('Superscript');

export var superscript = {
  name: name,
  title: title,
  tagName: 'sup',
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

    return createElement(RichTextToolbarButton, {
      icon: superscriptIcon,
      title: title,
      onClick: onClick,
      isActive: isActive
    });
  }
};
//# sourceMappingURL=index.js.map