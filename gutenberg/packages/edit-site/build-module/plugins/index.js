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

import ToolsMoreMenuGroup from '../components/header/tools-more-menu-group';
registerPlugin('edit-site', {
  render: function render() {
    return createElement(Fragment, null, createElement(ToolsMoreMenuGroup, null, createElement(MenuItem, {
      role: "menuitem",
      href: addQueryArgs('edit.php', {
        post_type: 'wp_block'
      })
    }, __('Manage all reusable blocks')), createElement(MenuItem, {
      role: "menuitem",
      href: __('https://wordpress.org/support/article/wordpress-editor/'),
      target: "_blank",
      rel: "noopener noreferrer"
    }, __('Help'))));
  }
});
//# sourceMappingURL=index.js.map