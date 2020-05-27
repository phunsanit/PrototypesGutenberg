import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
import { ComplementaryArea } from '@wordpress/interface';
import { __ } from '@wordpress/i18n';
import { cog, pencil } from '@wordpress/icons';

var _createSlotFill = createSlotFill('EditSiteSidebarInspector'),
    InspectorSlot = _createSlotFill.Slot,
    InspectorFill = _createSlotFill.Fill;

export var SidebarInspectorFill = InspectorFill;
export function SidebarComplementaryAreaFills() {
  return createElement(Fragment, null, createElement(ComplementaryArea, {
    scope: "core/edit-site",
    identifier: "edit-site/block-inspector",
    title: __('Block Inspector'),
    icon: cog
  }, createElement(InspectorSlot, {
    bubblesVirtually: true
  })), createElement(ComplementaryArea, {
    scope: "core/edit-site",
    identifier: "edit-site/global-styles",
    title: __('Global Styles'),
    icon: pencil
  }, createElement("p", null, "Global Styles area")));
}
//# sourceMappingURL=index.js.map