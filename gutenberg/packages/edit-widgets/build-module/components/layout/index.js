import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Popover } from '@wordpress/components';
import { InterfaceSkeleton, ComplementaryArea } from '@wordpress/interface';
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import Header from '../header';
import Sidebar from '../sidebar';
import WidgetAreasBlockEditorProvider from '../widget-areas-block-editor-provider';
import WidgetAreasBlockEditorContent from '../widget-areas-block-editor-content';

function Layout(_ref) {
  var blockEditorSettings = _ref.blockEditorSettings;
  var hasSidebarEnabled = useSelect(function (select) {
    return !!select('core/interface').getActiveComplementaryArea('core/edit-widgets');
  });
  return createElement(WidgetAreasBlockEditorProvider, {
    blockEditorSettings: blockEditorSettings
  }, createElement(InterfaceSkeleton, {
    header: createElement(Header, null),
    sidebar: hasSidebarEnabled && createElement(ComplementaryArea.Slot, {
      scope: "core/edit-widgets"
    }),
    content: createElement(WidgetAreasBlockEditorContent, null)
  }), createElement(Sidebar, null), createElement(Popover.Slot, null));
}

export default Layout;
//# sourceMappingURL=index.js.map