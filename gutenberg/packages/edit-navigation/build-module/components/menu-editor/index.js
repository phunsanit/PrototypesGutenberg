import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { BlockEditorKeyboardShortcuts, BlockEditorProvider } from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import useNavigationBlocks from './use-navigation-blocks';
import MenuEditorShortcuts from './shortcuts';
import BlockEditorPanel from './block-editor-panel';
import NavigationStructurePanel from './navigation-structure-panel';
export default function MenuEditor(_ref) {
  var menuId = _ref.menuId,
      blockEditorSettings = _ref.blockEditorSettings,
      onDeleteMenu = _ref.onDeleteMenu;

  var _useNavigationBlocks = useNavigationBlocks(menuId),
      _useNavigationBlocks2 = _slicedToArray(_useNavigationBlocks, 3),
      blocks = _useNavigationBlocks2[0],
      setBlocks = _useNavigationBlocks2[1],
      saveBlocks = _useNavigationBlocks2[2];

  var isLargeViewport = useViewportMatch('medium');
  return createElement("div", {
    className: "edit-navigation-menu-editor"
  }, createElement(BlockEditorKeyboardShortcuts.Register, null), createElement(MenuEditorShortcuts.Register, null), createElement(BlockEditorProvider, {
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
  }, createElement(BlockEditorKeyboardShortcuts, null), createElement(MenuEditorShortcuts, {
    saveBlocks: saveBlocks
  }), createElement(NavigationStructurePanel, {
    blocks: blocks,
    initialOpen: isLargeViewport
  }), createElement(BlockEditorPanel, {
    saveBlocks: saveBlocks,
    menuId: menuId,
    onDeleteMenu: onDeleteMenu
  })));
}
//# sourceMappingURL=index.js.map