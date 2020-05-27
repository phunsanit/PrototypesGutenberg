"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Layout;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _notices = _interopRequireDefault(require("../notices"));

var _menusEditor = _interopRequireDefault(require("../menus-editor"));

var _menuLocationsEditor = _interopRequireDefault(require("../menu-locations-editor"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Layout(_ref) {
  var blockEditorSettings = _ref.blockEditorSettings;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.SlotFillProvider, null, (0, _element.createElement)(_components.DropZoneProvider, null, (0, _element.createElement)(_components.FocusReturnProvider, null, (0, _element.createElement)(_notices.default, null), (0, _element.createElement)(_components.TabPanel, {
    className: "edit-navigation-layout__tab-panel",
    tabs: [{
      name: 'menus',
      title: (0, _i18n.__)('Edit Navigation')
    }, {
      name: 'menu-locations',
      title: (0, _i18n.__)('Manage Locations')
    }]
  }, function (tab) {
    return (0, _element.createElement)(_element.Fragment, null, tab.name === 'menus' && (0, _element.createElement)(_menusEditor.default, {
      blockEditorSettings: blockEditorSettings
    }), tab.name === 'menu-locations' && (0, _element.createElement)(_menuLocationsEditor.default, null));
  }), (0, _element.createElement)(_components.Popover.Slot, null)))));
}
//# sourceMappingURL=index.js.map