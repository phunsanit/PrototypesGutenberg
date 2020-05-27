import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { BlockInspector } from '@wordpress/block-editor';
import { cog } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import SettingsHeader from '../settings-header';
import PostStatus from '../post-status';
import LastRevision from '../last-revision';
import PostTaxonomies from '../post-taxonomies';
import FeaturedImage from '../featured-image';
import PostExcerpt from '../post-excerpt';
import PostLink from '../post-link';
import DiscussionPanel from '../discussion-panel';
import PageAttributes from '../page-attributes';
import MetaBoxes from '../../meta-boxes';
import PluginDocumentSettingPanel from '../plugin-document-setting-panel';
import PluginSidebarEditPost from '../../sidebar/plugin-sidebar';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

var SettingsSidebar = function SettingsSidebar() {
  var _useSelect = useSelect(function (select) {
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

  return createElement(PluginSidebarEditPost, {
    identifier: sidebarName,
    header: createElement(SettingsHeader, {
      sidebarName: sidebarName
    }),
    closeLabel: __('Close settings'),
    headerClassName: "edit-post-sidebar__panel-tabs",
    title: __('Settings'),
    toggleShortcut: keyboardShortcut,
    icon: cog
  }, sidebarName === 'edit-post/document' && createElement(Fragment, null, createElement(PostStatus, null), createElement(PluginDocumentSettingPanel.Slot, null), createElement(LastRevision, null), createElement(PostLink, null), createElement(PostTaxonomies, null), createElement(FeaturedImage, null), createElement(PostExcerpt, null), createElement(DiscussionPanel, null), createElement(PageAttributes, null), createElement(MetaBoxes, {
    location: "side"
  })), sidebarName === 'edit-post/block' && createElement(BlockInspector, null));
};

export default SettingsSidebar;
//# sourceMappingURL=index.js.map