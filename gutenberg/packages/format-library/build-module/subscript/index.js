import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { subscript as subscriptIcon } from '@wordpress/icons';
var name = 'core/subscript';

var title = __('Subscript');

export var subscript = {
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
      onChange(toggleFormat(value, {
        type: name
      }));
    }

    function onClick() {
      onToggle();
      onFocus();
    }

    return createElement(RichTextToolbarButton, {
      icon: subscriptIcon,
      title: title,
      onClick: onClick,
      isActive: isActive
    });
  }
};
//# sourceMappingURL=index.js.map