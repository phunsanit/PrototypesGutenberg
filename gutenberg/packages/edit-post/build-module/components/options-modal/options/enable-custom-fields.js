import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import BaseOption from './base';
export function CustomFieldsConfirmation(_ref) {
  var willEnable = _ref.willEnable;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isReloading = _useState2[0],
      setIsReloading = _useState2[1];

  return createElement(Fragment, null, createElement("p", {
    className: "edit-post-options-modal__custom-fields-confirmation-message"
  }, __('A page reload is required for this change. Make sure your content is saved before reloading.')), createElement(Button, {
    className: "edit-post-options-modal__custom-fields-confirmation-button",
    isSecondary: true,
    isBusy: isReloading,
    disabled: isReloading,
    onClick: function onClick() {
      setIsReloading(true);
      document.getElementById('toggle-custom-fields-form').submit();
    }
  }, willEnable ? __('Enable & Reload') : __('Disable & Reload')));
}
export function EnableCustomFieldsOption(_ref2) {
  var label = _ref2.label,
      areCustomFieldsEnabled = _ref2.areCustomFieldsEnabled;

  var _useState3 = useState(areCustomFieldsEnabled),
      _useState4 = _slicedToArray(_useState3, 2),
      isChecked = _useState4[0],
      setIsChecked = _useState4[1];

  return createElement(BaseOption, {
    label: label,
    isChecked: isChecked,
    onChange: setIsChecked
  }, isChecked !== areCustomFieldsEnabled && createElement(CustomFieldsConfirmation, {
    willEnable: isChecked
  }));
}
export default withSelect(function (select) {
  return {
    areCustomFieldsEnabled: !!select('core/editor').getEditorSettings().enableCustomFields
  };
})(EnableCustomFieldsOption);
//# sourceMappingURL=enable-custom-fields.js.map