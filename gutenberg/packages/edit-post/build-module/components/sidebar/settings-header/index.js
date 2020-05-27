import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withDispatch } from '@wordpress/data';

var SettingsHeader = function SettingsHeader(_ref) {
  var openDocumentSettings = _ref.openDocumentSettings,
      openBlockSettings = _ref.openBlockSettings,
      sidebarName = _ref.sidebarName;

  var blockLabel = __('Block');

  var _ref2 = sidebarName === 'edit-post/document' ? // translators: ARIA label for the Document sidebar tab, selected.
  [__('Document (selected)'), 'is-active'] : // translators: ARIA label for the Document sidebar tab, not selected.
  [__('Document'), ''],
      _ref3 = _slicedToArray(_ref2, 2),
      documentAriaLabel = _ref3[0],
      documentActiveClass = _ref3[1];

  var _ref4 = sidebarName === 'edit-post/block' ? // translators: ARIA label for the Settings Sidebar tab, selected.
  [__('Block (selected)'), 'is-active'] : // translators: ARIA label for the Settings Sidebar tab, not selected.
  [__('Block'), ''],
      _ref5 = _slicedToArray(_ref4, 2),
      blockAriaLabel = _ref5[0],
      blockActiveClass = _ref5[1];
  /* Use a list so screen readers will announce how many tabs there are. */


  return createElement("ul", null, createElement("li", null, createElement(Button, {
    onClick: openDocumentSettings,
    className: "edit-post-sidebar__panel-tab ".concat(documentActiveClass),
    "aria-label": documentAriaLabel,
    "data-label": __('Document')
  }, __('Document'))), createElement("li", null, createElement(Button, {
    onClick: openBlockSettings,
    className: "edit-post-sidebar__panel-tab ".concat(blockActiveClass),
    "aria-label": blockAriaLabel,
    "data-label": blockLabel
  }, blockLabel)));
};

export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openGeneralSidebar = _dispatch.openGeneralSidebar;

  return {
    openDocumentSettings: function openDocumentSettings() {
      openGeneralSidebar('edit-post/document');
    },
    openBlockSettings: function openBlockSettings() {
      openGeneralSidebar('edit-post/block');
    }
  };
})(SettingsHeader);
//# sourceMappingURL=index.js.map