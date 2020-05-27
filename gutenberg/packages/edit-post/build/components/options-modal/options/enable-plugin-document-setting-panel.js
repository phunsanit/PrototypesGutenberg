"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _index = require("./index");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('EnablePluginDocumentSettingPanelOption'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var EnablePluginDocumentSettingPanelOption = function EnablePluginDocumentSettingPanelOption(_ref) {
  var label = _ref.label,
      panelName = _ref.panelName;
  return (0, _element.createElement)(Fill, null, (0, _element.createElement)(_index.EnablePanelOption, {
    label: label,
    panelName: panelName
  }));
};

EnablePluginDocumentSettingPanelOption.Slot = Slot;
var _default = EnablePluginDocumentSettingPanelOption;
exports.default = _default;
//# sourceMappingURL=enable-plugin-document-setting-panel.js.map