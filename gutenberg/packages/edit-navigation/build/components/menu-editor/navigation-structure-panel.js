"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NavigationStructurePanel;

var _element = require("@wordpress/element");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function NavigationStructurePanel(_ref) {
  var blocks = _ref.blocks,
      initialOpen = _ref.initialOpen;
  var selectedBlockClientIds = (0, _data.useSelect)(function (select) {
    return select('core/block-editor').getSelectedBlockClientIds();
  }, []);

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      selectBlock = _useDispatch.selectBlock;

  var showNavigationStructure = !!blocks.length;
  return (0, _element.createElement)(_components.Panel, {
    className: "edit-navigation-menu-editor__navigation-structure-panel"
  }, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Navigation structure'),
    initialOpen: initialOpen
  }, showNavigationStructure && (0, _element.createElement)(_blockEditor.__experimentalBlockNavigationTree, {
    blocks: blocks,
    selectedBlockClientId: selectedBlockClientIds[0],
    selectBlock: selectBlock,
    __experimentalWithBlockNavigationSlots: true,
    __experimentalWithBlockNavigationBlockSettings: true,
    __experimentalWithBlockNavigationBlockSettingsMinLevel: 2,
    showNestedBlocks: true,
    showAppender: true,
    showBlockMovers: true
  })));
}
//# sourceMappingURL=navigation-structure-panel.js.map