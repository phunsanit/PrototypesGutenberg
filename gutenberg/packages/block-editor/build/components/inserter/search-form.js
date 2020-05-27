"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
function InserterSearchForm(_ref) {
  var _onChange = _ref.onChange;
  var instanceId = (0, _compose.useInstanceId)(InserterSearchForm); // Disable reason (no-autofocus): The inserter menu is a modal display, not one which
  // is always visible, and one which already incurs this behavior of autoFocus via
  // Popover's focusOnMount.

  /* eslint-disable jsx-a11y/no-autofocus */

  return (0, _element.createElement)("div", {
    className: "block-editor-inserter__search"
  }, (0, _element.createElement)(_components.VisuallyHidden, {
    as: "label",
    htmlFor: "block-editor-inserter__search-".concat(instanceId)
  }, (0, _i18n.__)('Search for a block')), (0, _element.createElement)("input", {
    className: "block-editor-inserter__search-input",
    id: "block-editor-inserter__search-".concat(instanceId),
    type: "search",
    placeholder: (0, _i18n.__)('Search for a block'),
    autoFocus: true,
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    },
    autoComplete: "off"
  }), (0, _element.createElement)(_icons.Icon, {
    className: "block-editor-inserter__search-icon",
    icon: _icons.search
  }));
  /* eslint-enable jsx-a11y/no-autofocus */
}

var _default = InserterSearchForm;
exports.default = _default;
//# sourceMappingURL=search-form.js.map