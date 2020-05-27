"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _plugins = require("@wordpress/plugins");

var _url = require("@wordpress/url");

var _toolsMoreMenuGroup = _interopRequireDefault(require("../components/header/tools-more-menu-group"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
(0, _plugins.registerPlugin)('edit-site', {
  render: function render() {
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_toolsMoreMenuGroup.default, null, (0, _element.createElement)(_components.MenuItem, {
      role: "menuitem",
      href: (0, _url.addQueryArgs)('edit.php', {
        post_type: 'wp_block'
      })
    }, (0, _i18n.__)('Manage all reusable blocks')), (0, _element.createElement)(_components.MenuItem, {
      role: "menuitem",
      href: (0, _i18n.__)('https://wordpress.org/support/article/wordpress-editor/'),
      target: "_blank",
      rel: "noopener noreferrer"
    }, (0, _i18n.__)('Help'))));
  }
});
//# sourceMappingURL=index.js.map