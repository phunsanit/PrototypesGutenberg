import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
/**
 * Internal dependencies
 */

import { EnablePanelOption } from './index';

var _createSlotFill = createSlotFill('EnablePluginDocumentSettingPanelOption'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var EnablePluginDocumentSettingPanelOption = function EnablePluginDocumentSettingPanelOption(_ref) {
  var label = _ref.label,
      panelName = _ref.panelName;
  return createElement(Fill, null, createElement(EnablePanelOption, {
    label: label,
    panelName: panelName
  }));
};

EnablePluginDocumentSettingPanelOption.Slot = Slot;
export default EnablePluginDocumentSettingPanelOption;
//# sourceMappingURL=enable-plugin-document-setting-panel.js.map