"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockEditorPanel;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _deleteMenuButton = _interopRequireDefault(require("../delete-menu-button"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockEditorPanel(_ref) {
  var onDeleteMenu = _ref.onDeleteMenu,
      menuId = _ref.menuId,
      saveBlocks = _ref.saveBlocks;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        isNavigationMode = _select.isNavigationMode,
        getBlockSelectionStart = _select.getBlockSelectionStart,
        getBlock = _select.getBlock;

    var selectionStartClientId = getBlockSelectionStart();
    return {
      isNavigationModeActive: isNavigationMode(),
      hasSelectedBlock: !!selectionStartClientId && !!getBlock(selectionStartClientId)
    };
  }, []),
      isNavigationModeActive = _useSelect.isNavigationModeActive,
      hasSelectedBlock = _useSelect.hasSelectedBlock;

  return (0, _element.createElement)(_components.Panel, {
    className: "edit-navigation-menu-editor__block-editor-panel"
  }, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Navigation menu')
  }, (0, _element.createElement)("div", {
    className: "components-panel__header-actions"
  }, (0, _element.createElement)(_components.Button, {
    isPrimary: true,
    onClick: saveBlocks
  }, (0, _i18n.__)('Save navigation'))), (0, _element.createElement)(_blockEditor.NavigableToolbar, {
    className: (0, _classnames.default)('edit-navigation-menu-editor__block-editor-toolbar', {
      'is-hidden': isNavigationModeActive
    }),
    "aria-label": (0, _i18n.__)('Block tools')
  }, hasSelectedBlock && (0, _element.createElement)(_blockEditor.BlockToolbar, {
    hideDragHandle: true
  })), (0, _element.createElement)(_components.Popover.Slot, {
    name: "block-toolbar"
  }), (0, _element.createElement)(_blockEditor.WritingFlow, null, (0, _element.createElement)(_blockEditor.ObserveTyping, null, (0, _element.createElement)(_blockEditor.BlockList, null))), (0, _element.createElement)("div", {
    className: "components-panel__footer-actions"
  }, (0, _element.createElement)(_deleteMenuButton.default, {
    menuId: menuId,
    onDelete: onDeleteMenu
  }))));
}
//# sourceMappingURL=block-editor-panel.js.map