"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _interface = require("@wordpress/interface");

var _data = require("@wordpress/data");

var _header = _interopRequireDefault(require("../header"));

var _sidebar = _interopRequireDefault(require("../sidebar"));

var _widgetAreasBlockEditorProvider = _interopRequireDefault(require("../widget-areas-block-editor-provider"));

var _widgetAreasBlockEditorContent = _interopRequireDefault(require("../widget-areas-block-editor-content"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Layout(_ref) {
  var blockEditorSettings = _ref.blockEditorSettings;
  var hasSidebarEnabled = (0, _data.useSelect)(function (select) {
    return !!select('core/interface').getActiveComplementaryArea('core/edit-widgets');
  });
  return (0, _element.createElement)(_widgetAreasBlockEditorProvider.default, {
    blockEditorSettings: blockEditorSettings
  }, (0, _element.createElement)(_interface.InterfaceSkeleton, {
    header: (0, _element.createElement)(_header.default, null),
    sidebar: hasSidebarEnabled && (0, _element.createElement)(_interface.ComplementaryArea.Slot, {
      scope: "core/edit-widgets"
    }),
    content: (0, _element.createElement)(_widgetAreasBlockEditorContent.default, null)
  }), (0, _element.createElement)(_sidebar.default, null), (0, _element.createElement)(_components.Popover.Slot, null));
}

var _default = Layout;
exports.default = _default;
//# sourceMappingURL=index.js.map