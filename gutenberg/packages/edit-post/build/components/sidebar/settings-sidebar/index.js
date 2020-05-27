"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

var _settingsHeader = _interopRequireDefault(require("../settings-header"));

var _postStatus = _interopRequireDefault(require("../post-status"));

var _lastRevision = _interopRequireDefault(require("../last-revision"));

var _postTaxonomies = _interopRequireDefault(require("../post-taxonomies"));

var _featuredImage = _interopRequireDefault(require("../featured-image"));

var _postExcerpt = _interopRequireDefault(require("../post-excerpt"));

var _postLink = _interopRequireDefault(require("../post-link"));

var _discussionPanel = _interopRequireDefault(require("../discussion-panel"));

var _pageAttributes = _interopRequireDefault(require("../page-attributes"));

var _metaBoxes = _interopRequireDefault(require("../../meta-boxes"));

var _pluginDocumentSettingPanel = _interopRequireDefault(require("../plugin-document-setting-panel"));

var _pluginSidebar = _interopRequireDefault(require("../../sidebar/plugin-sidebar"));

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var SettingsSidebar = function SettingsSidebar() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    // The settings sidebar is used by the edit-post/document and edit-post/block sidebars.
    // sidebarName represents the sidebar that is active or that should be active when the SettingsSidebar toggle button is pressed.
    // If one of the two sidebars is active the component will contain the content of that sidebar.
    // When neither of the the two sidebars is active we can not simply return null, because the PluginSidebarEditPost
    // component, besides being used to render the sidebar, also renders the toggle button. In that case sidebarName
    // should contain the sidebar that will be active when the toggle button is pressed. If a block
    // is selected, that should be edit-post/block otherwise it's edit-post/document.
    var sidebar = select('core/interface').getActiveComplementaryArea('core/edit-post');

    if (!['edit-post/document', 'edit-post/block'].includes(sidebar)) {
      if (select('core/block-editor').getBlockSelectionStart()) {
        sidebar = 'edit-post/block';
      }

      sidebar = 'edit-post/document';
    }

    var shortcut = select('core/keyboard-shortcuts').getShortcutRepresentation('core/edit-post/toggle-sidebar');
    return {
      sidebarName: sidebar,
      keyboardShortcut: shortcut
    };
  }, []),
      sidebarName = _useSelect.sidebarName,
      keyboardShortcut = _useSelect.keyboardShortcut;

  return (0, _element.createElement)(_pluginSidebar.default, {
    identifier: sidebarName,
    header: (0, _element.createElement)(_settingsHeader.default, {
      sidebarName: sidebarName
    }),
    closeLabel: (0, _i18n.__)('Close settings'),
    headerClassName: "edit-post-sidebar__panel-tabs",
    title: (0, _i18n.__)('Settings'),
    toggleShortcut: keyboardShortcut,
    icon: _icons.cog
  }, sidebarName === 'edit-post/document' && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_postStatus.default, null), (0, _element.createElement)(_pluginDocumentSettingPanel.default.Slot, null), (0, _element.createElement)(_lastRevision.default, null), (0, _element.createElement)(_postLink.default, null), (0, _element.createElement)(_postTaxonomies.default, null), (0, _element.createElement)(_featuredImage.default, null), (0, _element.createElement)(_postExcerpt.default, null), (0, _element.createElement)(_discussionPanel.default, null), (0, _element.createElement)(_pageAttributes.default, null), (0, _element.createElement)(_metaBoxes.default, {
    location: "side"
  })), sidebarName === 'edit-post/block' && (0, _element.createElement)(_blockEditor.BlockInspector, null));
};

var _default = SettingsSidebar;
exports.default = _default;
//# sourceMappingURL=index.js.map