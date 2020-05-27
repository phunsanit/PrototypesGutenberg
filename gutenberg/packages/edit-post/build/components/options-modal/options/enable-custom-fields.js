"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomFieldsConfirmation = CustomFieldsConfirmation;
exports.EnableCustomFieldsOption = EnableCustomFieldsOption;
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _base = _interopRequireDefault(require("./base"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function CustomFieldsConfirmation(_ref) {
  var willEnable = _ref.willEnable;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isReloading = _useState2[0],
      setIsReloading = _useState2[1];

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("p", {
    className: "edit-post-options-modal__custom-fields-confirmation-message"
  }, (0, _i18n.__)('A page reload is required for this change. Make sure your content is saved before reloading.')), (0, _element.createElement)(_components.Button, {
    className: "edit-post-options-modal__custom-fields-confirmation-button",
    isSecondary: true,
    isBusy: isReloading,
    disabled: isReloading,
    onClick: function onClick() {
      setIsReloading(true);
      document.getElementById('toggle-custom-fields-form').submit();
    }
  }, willEnable ? (0, _i18n.__)('Enable & Reload') : (0, _i18n.__)('Disable & Reload')));
}

function EnableCustomFieldsOption(_ref2) {
  var label = _ref2.label,
      areCustomFieldsEnabled = _ref2.areCustomFieldsEnabled;

  var _useState3 = (0, _element.useState)(areCustomFieldsEnabled),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isChecked = _useState4[0],
      setIsChecked = _useState4[1];

  return (0, _element.createElement)(_base.default, {
    label: label,
    isChecked: isChecked,
    onChange: setIsChecked
  }, isChecked !== areCustomFieldsEnabled && (0, _element.createElement)(CustomFieldsConfirmation, {
    willEnable: isChecked
  }));
}

var _default = (0, _data.withSelect)(function (select) {
  return {
    areCustomFieldsEnabled: !!select('core/editor').getEditorSettings().enableCustomFields
  };
})(EnableCustomFieldsOption);

exports.default = _default;
//# sourceMappingURL=enable-custom-fields.js.map