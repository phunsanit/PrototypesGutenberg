"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockManagerShowAll;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function BlockManagerShowAll(_ref) {
  var checked = _ref.checked,
      _onChange = _ref.onChange;
  var instanceId = (0, _compose.useInstanceId)(BlockManagerShowAll);
  var id = 'edit-post-manage-blocks-modal__show-all-' + instanceId;
  return (0, _element.createElement)("div", {
    className: "edit-post-manage-blocks-modal__show-all"
  }, (0, _element.createElement)("label", {
    htmlFor: id,
    className: "edit-post-manage-blocks-modal__show-all-label"
  },
  /* translators: Checkbox toggle label */
  (0, _i18n.__)('Show section')), (0, _element.createElement)(_components.FormToggle, {
    id: id,
    checked: checked,
    onChange: function onChange(event) {
      return _onChange(event.target.checked);
    }
  }));
}
//# sourceMappingURL=show-all.js.map