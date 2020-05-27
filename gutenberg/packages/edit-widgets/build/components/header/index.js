"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _interface = require("@wordpress/interface");

var _compose = require("@wordpress/compose");

var _saveButton = _interopRequireDefault(require("../save-button"));

var _undo = _interopRequireDefault(require("./undo-redo/undo"));

var _redo = _interopRequireDefault(require("./undo-redo/redo"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var inserterToggleProps = {
  isPrimary: true
};

function Header(_ref) {
  var isCustomizer = _ref.isCustomizer;
  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    className: "edit-widgets-header"
  }, (0, _element.createElement)(_components.NavigableMenu, null, (0, _element.createElement)(_blockEditor.Inserter, {
    position: "bottom right",
    showInserterHelpPanel: true,
    toggleProps: inserterToggleProps
  }), (0, _element.createElement)(_undo.default, null), (0, _element.createElement)(_redo.default, null), (0, _element.createElement)(_blockEditor.BlockNavigationDropdown, null)), !isCustomizer && (0, _element.createElement)("h1", {
    className: "edit-widgets-header__title"
  }, (0, _i18n.__)('Block Areas'), " ", (0, _i18n.__)('(experimental)')), (0, _element.createElement)("div", {
    className: "edit-widgets-header__actions"
  }, !isCustomizer && (0, _element.createElement)(_saveButton.default, null), (0, _element.createElement)(_interface.PinnedItems.Slot, {
    scope: "core/edit-widgets"
  }))), (!isLargeViewport || isCustomizer) && (0, _element.createElement)("div", {
    className: "edit-widgets-header__block-toolbar"
  }, (0, _element.createElement)(_blockEditor.BlockToolbar, {
    hideDragHandle: true
  })));
}

var _default = Header;
exports.default = _default;
//# sourceMappingURL=index.js.map