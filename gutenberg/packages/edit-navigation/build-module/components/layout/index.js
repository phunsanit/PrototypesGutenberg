import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { DropZoneProvider, FocusReturnProvider, Popover, SlotFillProvider, TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import Notices from '../notices';
import MenusEditor from '../menus-editor';
import MenuLocationsEditor from '../menu-locations-editor';
export default function Layout(_ref) {
  var blockEditorSettings = _ref.blockEditorSettings;
  return createElement(Fragment, null, createElement(SlotFillProvider, null, createElement(DropZoneProvider, null, createElement(FocusReturnProvider, null, createElement(Notices, null), createElement(TabPanel, {
    className: "edit-navigation-layout__tab-panel",
    tabs: [{
      name: 'menus',
      title: __('Edit Navigation')
    }, {
      name: 'menu-locations',
      title: __('Manage Locations')
    }]
  }, function (tab) {
    return createElement(Fragment, null, tab.name === 'menus' && createElement(MenusEditor, {
      blockEditorSettings: blockEditorSettings
    }), tab.name === 'menu-locations' && createElement(MenuLocationsEditor, null));
  }), createElement(Popover.Slot, null)))));
}
//# sourceMappingURL=index.js.map