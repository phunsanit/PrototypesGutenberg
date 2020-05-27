"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
function BaseOption(_ref) {
  var label = _ref.label,
      isChecked = _ref.isChecked,
      onChange = _ref.onChange,
      children = _ref.children;
  return (0, _element.createElement)("div", {
    className: "edit-post-options-modal__option"
  }, (0, _element.createElement)(_components.CheckboxControl, {
    label: label,
    checked: isChecked,
    onChange: onChange
  }), children);
}

var _default = BaseOption;
exports.default = _default;
//# sourceMappingURL=base.js.map