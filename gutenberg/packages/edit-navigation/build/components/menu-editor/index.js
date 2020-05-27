"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MenuEditor;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _blockEditor = require("@wordpress/block-editor");

var _compose = require("@wordpress/compose");

var _useNavigationBlocks3 = _interopRequireDefault(require("./use-navigation-blocks"));

var _shortcuts = _interopRequireDefault(require("./shortcuts"));

var _blockEditorPanel = _interopRequireDefault(require("./block-editor-panel"));

var _navigationStructurePanel = _interopRequireDefault(require("./navigation-structure-panel"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MenuEditor(_ref) {
  var menuId = _ref.menuId,
      blockEditorSettings = _ref.blockEditorSettings,
      onDeleteMenu = _ref.onDeleteMenu;

  var _useNavigationBlocks = (0, _useNavigationBlocks3.default)(menuId),
      _useNavigationBlocks2 = (0, _slicedToArray2.default)(_useNavigationBlocks, 3),
      blocks = _useNavigationBlocks2[0],
      setBlocks = _useNavigationBlocks2[1],
      saveBlocks = _useNavigationBlocks2[2];

  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  return (0, _element.createElement)("div", {
    className: "edit-navigation-menu-editor"
  }, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts.Register, null), (0, _element.createElement)(_shortcuts.default.Register, null), (0, _element.createElement)(_blockEditor.BlockEditorProvider, {
    value: blocks,
    onInput: function onInput(updatedBlocks) {
      return setBlocks(updatedBlocks);
    },
    onChange: function onChange(updatedBlocks) {
      return setBlocks(updatedBlocks);
    },
    settings: _objectSpread({}, blockEditorSettings, {
      templateLock: 'all',
      hasFixedToolbar: true
    })
  }, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts, null), (0, _element.createElement)(_shortcuts.default, {
    saveBlocks: saveBlocks
  }), (0, _element.createElement)(_navigationStructurePanel.default, {
    blocks: blocks,
    initialOpen: isLargeViewport
  }), (0, _element.createElement)(_blockEditorPanel.default, {
    saveBlocks: saveBlocks,
    menuId: menuId,
    onDeleteMenu: onDeleteMenu
  })));
}
//# sourceMappingURL=index.js.map