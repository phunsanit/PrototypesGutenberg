import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';

function BaseOption(_ref) {
  var label = _ref.label,
      isChecked = _ref.isChecked,
      onChange = _ref.onChange,
      children = _ref.children;
  return createElement("div", {
    className: "edit-post-options-modal__option"
  }, createElement(CheckboxControl, {
    label: label,
    checked: isChecked,
    onChange: onChange
  }), children);
}

export default BaseOption;
//# sourceMappingURL=base.js.map