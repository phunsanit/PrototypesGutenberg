"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Sidebar;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _interface = require("@wordpress/interface");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
function Sidebar() {
  return (0, _element.createElement)(_interface.ComplementaryArea, {
    className: "edit-widgets-sidebar",
    smallScreenTitle: (0, _i18n.__)('Widget Areas'),
    scope: "core/edit-widgets",
    complementaryAreaIdentifier: "edit-widgets/block-inspector",
    title: (0, _i18n.__)('Block'),
    icon: _icons.cog
  }, (0, _element.createElement)(_blockEditor.BlockInspector, {
    showNoBlockSelectedMessage: false
  }));
}
//# sourceMappingURL=index.js.map