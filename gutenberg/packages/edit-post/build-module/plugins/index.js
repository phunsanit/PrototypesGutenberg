import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */

import CopyContentMenuItem from './copy-content-menu-item';
import ManageBlocksMenuItem from './manage-blocks-menu-item';
import KeyboardShortcutsHelpMenuItem from './keyboard-shortcuts-help-menu-item';
import ToolsMoreMenuGroup from '../components/header/tools-more-menu-group';
import WelcomeGuideMenuItem from './welcome-guide-menu-item';
registerPlugin('edit-post', {
  render: function render() {
    return createElement(Fragment, null, createElement(ToolsMoreMenuGroup, null, function (_ref) {
      var onClose = _ref.onClose;
      return createElement(Fragment, null, createElement(ManageBlocksMenuItem, {
        onSelect: onClose
      }), createElement(MenuItem, {
        role: "menuitem",
        href: addQueryArgs('edit.php', {
          post_type: 'wp_block'
        })
      }, __('Manage all reusable blocks')), createElement(KeyboardShortcutsHelpMenuItem, {
        onSelect: onClose
      }), createElement(WelcomeGuideMenuItem, null), createElement(CopyContentMenuItem, null), createElement(MenuItem, {
        role: "menuitem",
        href: __('https://wordpress.org/support/article/wordpress-editor/'),
        target: "_blank",
        rel: "noopener noreferrer"
      }, __('Help')));
    }));
  }
});
//# sourceMappingURL=index.js.map