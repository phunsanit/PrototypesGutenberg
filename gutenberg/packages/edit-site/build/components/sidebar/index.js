"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarComplementaryAreaFills = SidebarComplementaryAreaFills;
exports.SidebarInspectorFill = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _interface = require("@wordpress/interface");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('EditSiteSidebarInspector'),
    InspectorSlot = _createSlotFill.Slot,
    InspectorFill = _createSlotFill.Fill;

var SidebarInspectorFill = InspectorFill;
exports.SidebarInspectorFill = SidebarInspectorFill;

function SidebarComplementaryAreaFills() {
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_interface.ComplementaryArea, {
    scope: "core/edit-site",
    identifier: "edit-site/block-inspector",
    title: (0, _i18n.__)('Block Inspector'),
    icon: _icons.cog
  }, (0, _element.createElement)(InspectorSlot, {
    bubblesVirtually: true
  })), (0, _element.createElement)(_interface.ComplementaryArea, {
    scope: "core/edit-site",
    identifier: "edit-site/global-styles",
    title: (0, _i18n.__)('Global Styles'),
    icon: _icons.pencil
  }, (0, _element.createElement)("p", null, "Global Styles area")));
}
//# sourceMappingURL=index.js.map